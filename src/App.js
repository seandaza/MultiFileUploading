import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuth } from './auth';
import FileUpload from './FileUpload';
import { SessionProvider } from './SessionProvider';
import SignIn from './SingIn';

const AuthRoute = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Outlet />

  }
  return <Navigate to="/sign-in" />
}

function App() {

  return (

    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoute />} path='/'>
            <Route element={<FileUpload />} path="/" />
          </Route>
          <Route element={<SignIn />} path="/sign-in" />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}

export default App;
