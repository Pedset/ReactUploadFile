import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';


const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [loadingScreen, setLoadingScreen] = useState('');


  const onChange = e => {
   try{
     setFile(e.target.files[0]);
     setFilename(e.target.files[0].name);
   } catch(e){
       setFile("");
       setFilename("Choose File");
   }
  };

  const onSubmit = async e => {
    setUploadedFile(null);
    setMessage(null);
    e.preventDefault();
    const formData = new FormData();
    
    if (file !== "") {
      formData.append('name', "file");
      formData.append('file', file);
      setLoadingScreen('content/loading.gif');
      try {
        const res = await axios.post('http://localhost:3000/user/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          }
        });
        setTimeout(() => setUploadPercentage(0), 10000);

        const fileText = res.data;

        setUploadedFile(fileText);

        setMessage({
          type : "success",
          text : fileText.InfoMessage
        });
      }catch (err) {
        if (!err) {
          if (err.response.status === 500) {
                  setMessage({
                    type : "danger",
                    text : 'There was a problem with the server'
                  });
                } else {
                  setMessage(err.response.data.msg);
                }
                setUploadPercentage(0)
        }else{
          setMessage({
            type : "danger",
            text : 'Failed to connect to server'
          });
        }
      }
    }
    else{
      setMessage({
        type : "warning",
        text : "You have to choose a file first"
      });
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
            <div className="preWrap" >{uploadedFile.Text}</div>
      ) : loadingScreen ? ( <img className="loadingScreen" src={loadingScreen}></img>) : null }
    </Fragment>
  );
};

export default FileUpload;
