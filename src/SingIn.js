import { Button, Icon, Input } from '@keoworld/gbl-ui-kit'
import { ANDROID_192 } from '@keoworld/gbl-ui-kit/assets/logo'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from './auth'
const initValue = { email: '', password: '' }

const SignIn = () => {
  const [visibility, setVisibility] = useState(false)
  const [form, setForm] = useState(initValue)
  const [formError, setFormError] = useState(initValue)
  const { isAuthenticated, signInWithMicrosoft, signInWithEmail } = useAuth()

  const onHandleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const validateForm = () => {
    let errors = { email: undefined, password: undefined }
    if (!form.email) {
      errors = { ...errors, email: 'Ingrese su correo electrónico' }
    }
    if (!form.password) {
      errors = { ...errors, password: 'Ingrese su contraseña' }
    }
    return errors
  }

  const onHandleSubmit = (event) => {
    event.preventDefault()
    const errors = validateForm()
    if (errors.email || errors.password) {
      setFormError({ email: errors.email, password: errors.password })
    } else {
      setFormError({})
      signInWithEmail(form.email, form.password)
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <SignInStyled>
      <img alt='logo' src={ANDROID_192} />
      <form className='sign-in' onSubmit={onHandleSubmit}>
        <Input
          label='Correo electrónico'
          name='email'
          type='email'
          value={form.email}
          error={formError.email}
          onChange={onHandleChange}
        />
        <Input
          label='Contraseña'
          name='password'
          type={visibility ? 'text' : 'password'}
          value={form.password}
          error={formError.password}
          onChange={onHandleChange}
          icon={
            <Icon
              type='outlined'
              name={visibility ? 'visibility_off' : 'visibility'}
              onClick={() => setVisibility(!visibility)}
            />
          }
        />
        <Button size='large' device='mobileLight' type='submit'>
          Entrar
        </Button>
      </form>
      <Button
        buttonType='outline'
        className='office-365'
        onClick={signInWithMicrosoft}
      >
        Office 365
      </Button>
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
export default SignIn