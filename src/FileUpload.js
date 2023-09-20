import { Button, Select } from '@keoworld/gbl-ui-kit'
import { ANDROID_192 } from '@keoworld/gbl-ui-kit/assets/logo'
import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
/* import { useAuth } from './auth' */
import Document from './Document'
import storage, { db } from './firebase'

const FileUpload = () => {
  const [documents, setDocuments] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [docsUrls, setDocsUrls] = useState({});
  /* const { signOut } = useAuth() */
  const options = [
    { value: 'ISR', label: 'ISR' }
  ]

  useEffect(() => {
    db.collection(`ocr`).onSnapshot((snapshot) => {
      const dataDocs = snapshot.docChanges().reduce((acc, itm) => {
        const doc = itm.doc.data()
        return {
          ...acc,
          [doc?.value]: {
            ...acc[doc?.value],
            [doc?.type]: doc?.label
          }
        }
      }, {})
      setDocsUrls(prev => ({ ...prev, ...dataDocs }))
    })
    /*
          snapshot.docChanges().forEach((change) => {
            console.log('data', change.doc.data())
            if (change.type === "added") {
              if (docsUrls[change.doc.data().value]){
                var tempdoc = docsUrls[change.doc.data().value] 
                tempdoc[change.doc.data().type] = change.doc.data().label
                setDocsUrls((prev) => ({...prev, [change.doc.data().value]: tempdoc}))
              } else {            
                setDocsUrls((prev) => ({...prev, [change.doc.data().value]:{[change.doc.data().type]: change.doc.data().label}}), console.log(docsUrls))
              }
            }
          });
        }); */
  }, []);

  const onHandleChange = (docs) => {
    setDocuments(docs[0]);
  }

  const onHandleChangeSelect = (event) => {
    setSelectedOption(event.target.value);
  }

  const deleteFile = () => {
    setDocuments(null);
  }

  const upload = async () => {
    if (documents == null || selectedOption == null || selectedOption === 'base') {
      console.log('NO pon algo')
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
    axios.post("https://ocrgunicorn-dot-gc-k-gbl-lab.uc.r.appspot.com/ocr", { "url": `docs/` + docname, "doctype": selectedOption })
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
        <Select
          label='tipo de archivo'
          onChange={onHandleChangeSelect}>
          <option value={'base'}>Seleccione tipo de archivo</option>
          {options.map((e, key) => {
            return (
              <option key={key} value={e.value}>
                {e.label}
              </option>
            );
          })}
        </Select>
        <p />
        <Document allowUpload allowedDocumentTypes=".pdf" documentName="file" key={documents}
          file={documents} label={"suba su documento"} onChange={onHandleChange} onClickDelete={deleteFile} />
        <p />
        <Button size='large' device='mobileLight' onClick={onHandleSubmit}>
          Cargar
        </Button>
      </form>
      <p />
      <table className="fl-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>PDF</th>
            <th>Excel</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(docsUrls).map((item, index) => {
            return <tr key={index}>
              <td key={item}>{item}</td>
              <td><a key={item + "pdf"} href={docsUrls[item]["pdf"]}> pdf </a></td>
              <td><a key={item + "xlsx"} href={docsUrls[item]["xlsx"]}> excel </a></td>
            </tr>;
          })}
        </tbody>
      </table>
{/*       <Button className="sign-out" onClick={signOut}>
        Log out
      </Button> */}
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