import { Button, Select } from '@keoworld/gbl-ui-kit'
import { ANDROID_192 } from '@keoworld/gbl-ui-kit/assets/logo'
import { useState } from 'react'
import styled from 'styled-components'
import Document from './Document'
import storage from './firebase'

const FileUpload = () => {

  const [documents , setDocuments] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: 'prueba', label: 'prueba' },
    { value: 'IRS', label: 'ISR' },
  ]

  const onHandleChange = (docs) => {
    setDocuments(docs[0]);
  }

  const onHandleChangeSelect = (event) => {
    setSelectedOption(event.target.value);
  }

  const deleteFile = () => {
    setDocuments('');
    console.log('docucumento pro',documents)
  }

  const upload = ()=>{
    if (documents == null) return;
    storage.ref(`/docs/${documents.name}`).put(documents);
    console.log(selectedOption)
  }

  const onHandleSubmit = (event) => {
    event.preventDefault();
    upload();
  }

  return (
    <SignInStyled>
      <img alt='logo' src={ANDROID_192} />
      <h2>Lectura de Archivos</h2>
      <form className='file_upload' onSubmit={onHandleSubmit}>
        <Select 
          label='tipo de archivo'
          onChange={onHandleChangeSelect}>
            <option value>Seleccione tipo de archivo</option>
                {options.map((e, key) => {
                  return (
                    <option key={key} value={e.value}>
                      {e.label}
                    </option>
                  );
            })}
        </Select>
        <p/>
        <Document allowUpload allowedDocumentTypes=".pdf" documentName="file" file={documents} 
        label={"suba su documento"} onChange={onHandleChange} onClickDelete={deleteFile}/>
        <p/>
        <Button size='large' device='mobileLight'  type='submit'>
          Cargar
        </Button> 
      </form>
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