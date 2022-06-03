import { Button, Select } from '@keoworld/gbl-ui-kit'
import { ANDROID_192 } from '@keoworld/gbl-ui-kit/assets/logo'
import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Document from './Document'
import storage from './firebase'

const FileUpload = () => {

  const [documents , setDocuments] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [docsUrls, setDocsUrls] = useState([]);
  const options = [
    { value: 'prueba', label: 'prueba' },
    { value: 'ISR', label: 'ISR' }
  ]

  useEffect (() => {
    storage.ref(`docs/`).listAll().then((response) => {
      console.log(response.items)
      response.items.forEach((item)=> {
        setDocsUrls((prev) => [...prev,{value:item.name, label: item.getDownloadURL()}]);
      });
    });
  },[]);  

  const onHandleChange = (docs) => {
    setDocuments(docs[0]);
  }

  const onHandleChangeSelect = (event) => {
    setSelectedOption(event.target.value);
  }

  const deleteFile = () => {
    setDocuments(null);
  }

  const upload = async ()=>{
    if (documents == null  || selectedOption == null || selectedOption === 'base') {
      console.log('NO pon algo')  
    } else {
      await storage.ref(`/docs/${documents.name}`).put(documents).then((snapshoot) => {
        snapshoot.ref().then((url) => {
          setDocsUrls((prev) => [...prev,{value:documents.name, label: url}]);
        });
      });
      descarga();
    }
  }

  const descarga = async () => {
    const url = await storage.ref("docs").child(documents.name).getDownloadURL()
    const response = await axios.post("https://ocrgunicorn-dot-gc-k-gbl-lab.uc.r.appspot.com/ocr",{"url": url,"doctype": selectedOption})
    console.log(response.data)
  }

  const onHandleSubmit = (event) => {
    event.preventDefault();
    upload();
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
        <p/>
        <Document allowUpload allowedDocumentTypes=".pdf" documentName="file" key={documents} 
        file={documents} label={"suba su documento"} onChange={onHandleChange} onClickDelete={deleteFile}/>
        <p/>
        <Button size='large' device='mobileLight' onClick={onHandleSubmit}>
          Cargar
        </Button> 
      </form>
      <p/>
      {docsUrls.map((e,key) => {
        return <a key={key} href={e.label}> {e.value} </a>;
      })} 
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
`
export default FileUpload