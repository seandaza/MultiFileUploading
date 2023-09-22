import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FileUpload from './FileUpload';
import { SessionProvider } from './SessionProvider';


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
