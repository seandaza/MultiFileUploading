import React from 'react';
import { BrowserRouter, /* Navigate, Outlet, */ Route, Routes } from 'react-router-dom';
import './App.css';
/* import { useAuth } from './auth'; */
import FileUpload from './FileUpload';
import { SessionProvider } from './SessionProvider';
/* import SignIn from './SingIn'; */

/* const AuthRoute = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Outlet />

  }
  return <Navigate to="/" />
} */

function App() {

  return (

    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<FileUpload />} path="/" />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}

export default App;
