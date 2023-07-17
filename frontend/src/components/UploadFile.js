import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'

const UploadFile = ({ csv, setCSV }) => {
  const handleFileChange = async ({ file }) => {
    // Check file type and size
    const isCSV = file.type === 'text/csv';
    const isSizeValid = file.size / 1024 / 1024 < 2;

    if (isCSV && isSizeValid) {
      setCSV(file);
      message.success('CSV File uploaded');
    } else {
      setCSV(null);

      if (!isCSV) {
        message.error('Please upload a CSV file.');
      } else if (!isSizeValid) {
        message.error('File size should be less than 2MB.');
      }
    }
  };

  const beforeUpload = (file) => {
    return false; // Prevent automatic upload
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      onChange={handleFileChange}
      fileList={csv ? [csv] : []}
    >
      <Button block icon={<UploadOutlined />}>Upload CSV File</Button>
    </Upload>
  );
};

UploadFile.propTypes = {
  csv: PropTypes.object,
  setCSV: PropTypes.func.isRequired
}

export default UploadFile;