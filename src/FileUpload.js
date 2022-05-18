import { Button, Icon, Input } from '@keoworld/gbl-ui-kit'
import { ANDROID_192 } from '@keoworld/gbl-ui-kit/assets/logo'
import { useState } from 'react'
import styled from 'styled-components'

const FileUpload = () => {

    const onHandleSubmit = async (event) => {
        event.preventDefault()
        console.log("boton")// texto plano
    }

    return (
        <SignInStyled>
            <img alt='logo' src={ANDROID_192} />
            <form className='sign-in' onSubmit={onHandleSubmit}>
                <Button size='large' device='mobileLight' type='submit'>
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