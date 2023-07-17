import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const UploadFile = ({setCSV}) =>{

  const handleFileChange = (file) => {
    if (file.status !== 'uploading') {
      setCSV(file);
    }
  };
  
  const handleFileUpload = (file) => {
    if (file.status === 'done') {
      // Display success message
      message.success(`${file.name} file uploaded successfully`);
      // Update the state with the file
      setCSV(file);
    } else if (file.status === 'error') {
      // Display error message
      message.error(`${file.name} file upload failed.`);
    }
  };
  return (
    <Upload
      style={{width:"100%"}}
      name="file"
      maxCount={1}
      beforeUpload={(file) => {
        return new Promise((resolve, reject) => {
          if (file.size > 20) {
            reject("File is too large");
            return;
          }
          resolve("Success");
        });
      }}
      onChange={({ file }) => handleFileChange(file)}
      onSuccess={({ file }) => handleFileUpload(file)}
    >
      <Button style={{width:"100%"}} block icon={<UploadOutlined />}>Upload CSV File</Button>
    </Upload>
  )};
export default UploadFile;