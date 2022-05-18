import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload'

function App() {

  const [loader, setLoader] = useState({
    microsoftLoading: false
  });

  return (
    <>
      <FileUpload/>
    </>
  );
}

export default App;
