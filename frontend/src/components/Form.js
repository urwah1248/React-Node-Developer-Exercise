import React, { useState, useRef } from 'react';
import './Form.css'; // Import CSS file for styling

const Form = () => {
  const [date, setDate] = useState('');
  const [vendor, setVendor] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle file upload
    const file = fileInputRef.current.files[0];

    const formData = new FormData();
    formData.append('csv', file);
    formData.append('date', date);
    formData.append('vendor', vendor);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        alert('File Uploaded successfully and updated the database.');
      } else if (response.status === 400) {
        alert('Uploaded CSV file is not in the proper format.');
      } else {
        console.error('File upload failed');
        alert('CSV file could not be uploaded.');
      }
    } catch (error) {
      console.error('An error occurred during file upload:', error);
      alert('An error occurred during file upload.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="form-title">Bulk Orders Form</h1>
      <label htmlFor="date" className="form-label">
        Date
      </label>
      <input
        type="date"
        name="date"
        id="date"
        className="form-input"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        required
      />
      <br />

      <label htmlFor="vendor" className="form-label">
        Vendor Name
      </label>
      <input
        placeholder="e.g John Doe"
        type="text"
        name="vendor"
        id="vendor"
        className="form-input"
        onChange={(e) => setVendor(e.target.value)}
        value={vendor}
        required
      />
      <br />

      <label htmlFor="quantity" className="form-label">
        CSV File
      </label>
      <input
        type="file"
        name="csv"
        id="csv"
        ref={fileInputRef}
        className="form-input"
      />
      <br />

      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
};

export default Form;
