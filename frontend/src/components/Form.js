import React, { useState, useRef } from 'react';
import Notification from './Notification';
import './Form.css'; // Import CSS file for styling

const Form = () => {
  const [date, setDate] = useState('');
  const [vendor, setVendor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle file upload
    const file = fileInputRef.current.files[0];

    const formData = new FormData();
    formData.append('csv', file);
    formData.append('date', date);
    formData.append('vendor', vendor);

    if(!date || !vendor || !file){
      setErrorMessage("Form is incomplete.")
      return;
    }

    // Check vendor name length
    if (vendor.length > 40) {
      setErrorMessage("Vendor name must be 40 characters or less.");
      return;
    }

    // Check date range
    // const currentDate = new Date();
    const selectedDate = new Date(date);

    // Calculate the minimum and maximum allowed dates
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 100);

    if (selectedDate < minDate || selectedDate > maxDate) {
      setErrorMessage("Date must be within the last 100 years.");
      return;
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        alert('File Uploaded successfully and updated the database.');
        setErrorMessage("")
      } else if (response.status === 400) {
        setErrorMessage('Uploaded CSV file is not in the proper format.');
      } else {
        console.error('File upload failed');
        setErrorMessage('CSV file could not be uploaded.');
      }
    } catch (error) {
      console.error('An error occurred during file upload:', error);
      alert('An error occurred during file upload.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="form-title">Bulk Orders Form</h1>
      <Notification message={errorMessage}/>
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
        maxlength={40}
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
        required
      />
      <br />

      <button type="submit" className="form-button">
        Submit
      </button>

      <a href="/api/orders" target='_blank' style={{marginTop:10, display:"block", textAlign:"center"}}>Check All Orders Here</a>
    </form>
  );
};

export default Form;
