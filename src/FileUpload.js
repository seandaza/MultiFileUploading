import { Button } from '@keoworld/gbl-ui-kit'
import { ANDROID_192 } from '@keoworld/gbl-ui-kit/assets/logo'
import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import { Container } from "reactstrap";
import { useDropzone } from 'react-dropzone'

/* import Document from './Document' */
import storage, { db } from './firebase'

const FileUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [rfc, setRfc] = useState('');
  const [selectedPdfFiles, setSelectedPdfFiles] = useState([]);

  const onHandleChange = (docs) => {
    setDocuments(docs);
    if (docs.length > 0) {
      const pdfFileNames = Array.from(docs).map((doc) => doc.name);
      setSelectedPdfFiles(pdfFileNames);
    }
  }

  const upload = async (rfc) => {
    if (documents.length === 0) {
      console.log('NO, pon algo');
    } else {
      var date = new Date();
      var flotDate = date.getTime().toString();
      
      // Lógica para procesar cada documento en 'documents'
      for (const file of documents) {
        const doc = file.name.split(".");
        const type = doc.pop();
        var value = doc.join(".");
        var nameDoc = `${value}-${flotDate}.${type}`; // Nombre del documento
  
        // Crear el nombre del directorio
        var directoryName = `${rfc}-${flotDate}`;
        // Subir el documento a Firebase Storage en el directorio creado
        const snapshot = await storage.ref(`/${directoryName}/${nameDoc}`).put(file);
        const url = await snapshot.ref.getDownloadURL();

        // Agregar el documento a Firestore
        await db.collection('ocr').doc().set({ value: value, label: url, type: type });

        // Crear un objeto FormData
        const formData = new FormData();
        formData.append("url", `docs/${nameDoc}`);

        // Configurar las cabeceras
        const headers = {
          "X-Requested-With": "XMLHttpRequest",
          // Otras cabeceras si es necesario
        };

        // Realizar la solicitud POST con FormData
        try {
          const response = await axios.post("https://ocrgunicorn-dot-gc-k-gbl-lab.uc.r.appspot.com/ocr", formData, {
            headers: headers,
          });
          const data = response.data;
          console.log(data);
        } catch (error) {
          console.error("Error en la solicitud POST:", error);
        }
      }
    }
  };
  
  const handleRfcChange = (event) => {
    // Actualizar el estado del RFC cuando cambie el input
    setRfc(event.target.value);
  };
  
  const onHandleSubmit = (event) => {
    event.preventDefault();
    upload(rfc);
    setDocuments([]);
    setRfc("");
    setSelectedPdfFiles([])
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: onHandleChange,
    multiple: true,
  });


  return (
    <SignInStyled>
      <img alt='logo' src={ANDROID_192} />
      <Container>
          <h2>Carga de Archivos</h2>
                <form className='file_upload'>
                  <p />
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      <p>Arrastra y suelta archivos o haz clic aquí para seleccionar 📤</p>
                    <p />
                    </div>
                    <p />
                    {/* Campo de entrada para el RFC aquí */}
                    <div className='rfc-input'>
                      <b><label htmlFor='rfc'>RFC del Cliente:  </label></b>
                      <input
                        type='text'
                        id='rfc'
                        name='rfc'
                        value={rfc} // Enlazar el valor del input con el estado "rfc"
                        onChange={handleRfcChange} // Manejar cambios en el input
                      />
                    </div>
                    <p />
                          {/* Lista de nombres de archivos PDF seleccionados */}
                    <div>
                    <b><label htmlFor='rfc'>Archivos PDF Seleccionados:  </label></b>
                      <ul>
                        {selectedPdfFiles.map((fileName, index) => (
                          <li key={index}>{fileName}</li>
                        ))}
                      </ul>
                    </div>
                    <div className='btn'>
                      <Button size='large' device='mobileLight' onClick={onHandleSubmit}>
                        Cargar
                      </Button>
                    </div>
                </form>
                <p />
      </Container>
    </SignInStyled>
  );
}

const SignInStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  img[alt='logo'] {
    width: 100px;
    margin-bottom: 2rem;
  }
  form.sign-in {
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    .input > .icon {
      cursor: pointer;
    }
    button[type='submit'] {
      margin: 1rem auto;
    }
    a {
      text-align: center;
    }
  }
  button.new-account {
    margin: 0;
  }
  .sign-out{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 10%
  }
  /* Table Styles */

  .fl-table {
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
    border-radius: 5px;
    border-collapse: collapse;
    width: 70%;
    max-width: 100%;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
}

.fl-table thead th {
    color: #ffffff;
    background: #FF4759;
}

.dropzone {
  text-align: center;
  padding: 20px;
  border: 3px dashed #eeeeee;
  background-color: #fafafa;
  color: #bdbdbd;
  margin-bottom: 20px;
  cursor: pointer;
}

.btn {
  text-align: center;
}

/* Responsive */
@media (max-width: 767px) {
    .fl-table {
        display: block;
        width: 100%;
    }
    .table-wrapper:before{
        content: "Scroll horizontally >";
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
    .fl-table thead, .fl-table tbody, .fl-table thead th {
        display: block;
    }
    .fl-table thead th:last-child{
        border-bottom: none;
    }
    .fl-table thead {
        float: left;
    }
    .fl-table tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }
    .fl-table td, .fl-table th {
        padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 200px;
    }
    .fl-table tbody tr {
        display: table-cell;
    }
   
    .fl-table tbody td {
        display: block;
        text-align: center;
    }

}
`
export default FileUpload