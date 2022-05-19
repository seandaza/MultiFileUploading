import { Button, Input } from '@keoworld/gbl-ui-kit'
import { ANDROID_192 } from '@keoworld/gbl-ui-kit/assets/logo'
import { useState } from 'react'
import styled from 'styled-components'
import storage from './firebase'

const FileUpload = () => {

  const [documents , setDocuments] = useState('');

  const upload = ()=>{
    if (documents == null) return;
    storage.ref(`/docs/${documents.name}`).put(documents);
  }

  const onHandleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    setDocuments(event.target.files[0]);
  }

  return (
    <SignInStyled>
      <img alt='logo' src={ANDROID_192} />
      <form className='sign-in'>
        <Input type="file" onChange={onHandleSubmit}/>
        <Button size='large' device='mobileLight' onClick={upload}>
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