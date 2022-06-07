import { Button, Select } from '@keoworld/gbl-ui-kit'
import { ANDROID_192 } from '@keoworld/gbl-ui-kit/assets/logo'
import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Document from './Document'
import storage, { db } from './firebase'

const FileUpload = () => {
  const [documents , setDocuments] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [docsUrls, setDocsUrls] = useState({});
  const options = [
    { value: 'ISR', label: 'ISR' }
  ]

  useEffect(() => {
    db.collection(`ocr`).onSnapshot((snapshot) => {
      const dataDocs = snapshot.docChanges().reduce( (acc, itm) => {
        const doc = itm.doc.data()
        return {
          ...acc,
          [doc?.value]: {
            ...acc[doc?.value],
            [doc?.type]: doc?.label
          }
        }
      }, {}) 
      setDocsUrls( prev => ({ ...prev, ...dataDocs }) )
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
      await storage.ref(`/docs/${documents.name}`).put(documents).then(async (snapshoot) => {
          const url = await snapshoot.ref.getDownloadURL();
          const doc = documents.name.split(".")
          db.collection('ocr').doc().set({value:doc[0], label: url, type: doc[1]});
        });    
      back();
    }
  }

  const back = async () => {
    await axios.post("https://ocrgunicorn-dot-gc-k-gbl-lab.uc.r.appspot.com/ocr",{"url": `docs/`+documents.name,"doctype": selectedOption})
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
      { Object.keys(docsUrls).map( (item, index) => {
        return <div key={index}>
          <a key={item+"pdf"} href={docsUrls[item]["pdf"]}> {item + ".pdf"} </a>
          <a key={item+"xlsx"} href={docsUrls[item]["xlsx"]}> {item + ".excel"} </a>
          </div>;
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