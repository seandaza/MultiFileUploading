import { Button } from '@keoworld/gbl-ui-kit'
import { ANDROID_192 } from '@keoworld/gbl-ui-kit/assets/logo'
import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'

import Document from './Document'
import storage, { db } from './firebase'

const FileUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedOption] = useState(null);


  const onHandleChange = (docs) => {
    setDocuments(docs[0]);
  }


  const deleteFile = () => {
    setDocuments(null);
  }

  const upload = async () => {
    if (documents == null) {
      console.log('NO, pon algo')
    } else {
      var date = new Date();
      var flotDate = date.getTime().toString()
      const doc = documents.name.split(".");
      const type = doc.pop();        
      var value = doc.join(".").concat("-",flotDate)
      var nameDoc = value.concat(".",type)
      await storage.ref(`/docs/${nameDoc}`).put(documents).then(async (snapshoot) => {
        const url = await snapshoot.ref.getDownloadURL();
        db.collection('ocr').doc().set({ value: value, label: url, type: type });
      });
      back(nameDoc);
    }
  }

  const back = (docname) => {
    axios.post("https://ocrgunicorn-dot-gc-k-gbl-lab.uc.r.appspot.com/ocr", { "url": `docs/` + docname, "doctype": selectedOption }
    .then((reponse) => {

    })
    )
  }

  const onHandleSubmit = (event) => {
    event.preventDefault();
    upload();
    setDocuments(null);
  }

  return (
    <SignInStyled>
      <img alt='logo' src={ANDROID_192} />
      <h2>Lectura de Archivos</h2>
      <form className='file_upload'>
        <p />
        <Document allowUpload allowedDocumentTypes=".pdf" documentName="file" key={documents}
          file={documents} label={"suba su documento"} onChange={onHandleChange} onClickDelete={deleteFile} />
        <p />
        <Button size='large' device='mobileLight' onClick={onHandleSubmit}>
          Cargar
        </Button>
      </form>
      <p />
    </SignInStyled>
  )
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