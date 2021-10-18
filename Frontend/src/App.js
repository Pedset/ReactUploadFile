import React from 'react';
import FileUpload from './components/FileUpload';
import './App.css';

const App = () => (
  <div className='container mt-4'>
    <h6 className='display-4 text-center mb-4'>
      <i className='fab fa-react' />File Upload With React
    </h6>
    <FileUpload />
  </div>
);

export default App;
