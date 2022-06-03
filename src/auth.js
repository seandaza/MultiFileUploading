import { SessionContext } from './SessionProvider'
import { useContext } from 'react'
import { auth, microsoftProvider } from './firebase'

export const useAuth = () => {
    const { userAuth, setUserAuth } = useContext(SessionContext)

    /**
     * function to sign in with email and password
     * @param {string} email
     * @param {string} password
     */
    const signInWithEmail = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch (error) {
            console.log('error', error)
        }
    }
    /**
     * function to sign in with microsoft account
     */
    const signInWithMicrosoft = async () => {
        try {
            const { user } = await auth.signInWithPopup(microsoftProvider)
            setUserAuth(user)
        } catch (error) {
            console.log('error', error)
        }
    }
    /**
     * function to sign out
     */
    const signOutController = () => {
        auth.signOut()
        setUserAuth()
    }
    /**
     * @constant {boolean} isSignedIn - true if user is signed in
     */
    const isAuthenticated = Boolean(userAuth)
    return {
        isAuthenticated,
        signInWithEmail,
        signInWithMicrosoft,
        signOut: signOutController,
        user: userAuth
    }
}