import { createContext, useEffect, useState } from 'react'
import { auth } from './firebase'

const context = {
  userAuth: undefined,
  setUserAuth: undefined
}

export const SessionContext = createContext(context)
export const SessionProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(context.userAuth)

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setUserAuth(user)
    })
    return () => { unsuscribe() }
  }, [])

  return (
    <SessionContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </SessionContext.Provider>
  )
}