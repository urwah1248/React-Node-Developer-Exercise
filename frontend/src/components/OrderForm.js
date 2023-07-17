import React, { useState } from 'react';
import './Form.css';
import { Link } from 'react-router-dom';
import LoadingIcons from 'react-loading-icons'
import { Button, Input, Form } from 'antd';
import { onFinish, onFinishFailed } from './notifications';
import UploadFile from './UploadFile';


const OrderForm = () => {
  const [date, setDate] = useState('');
  const [vendor, setVendor] = useState('');
  const [csv, setCSV] = useState(null)
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('csv', csv);
    formData.append('date', date);
    formData.append('vendor', vendor);

    //Extra measure in case someone changes required field from HTML
    if(!date || !vendor || !csv){
      setErrorMessage("Form is incomplete.")
      onFinishFailed(errorMessage)
      setLoading(false);
      return;
    }
    // Check vendor name length as Validation
    if (vendor.length > 40) {
      setErrorMessage("Vendor name must be 40 characters or less.");
      onFinishFailed(errorMessage)
      setLoading(false);
      return;
    }
    // Check date range
    const selectedDate = new Date(date);

    // Calculate the minimum and maximum allowed dates
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 100);

    //Date Validation
    if (selectedDate < minDate || selectedDate > maxDate) {
      setErrorMessage("Date must be within the last 100 years.");
      setLoading(false);
      return;
    }

    try {
      //Requesting Upload
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const resJson = await response.json()

      if (response.ok) {
        setLoading(false);
        setErrorMessage("");
        onFinish();
      } else if (response.status === 400) {
        setErrorMessage(resJson.errors[0]);
        onFinishFailed(errorMessage)
        setLoading(false);
      } else {
        setErrorMessage('CSV file could not be uploaded.');
        onFinishFailed(errorMessage)
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage('Something went wrong! Try again.');
      onFinishFailed(errorMessage)
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form-container">
      <h1 className="form-title">Bulk Orders Form</h1>
      <label htmlFor="date" className="form-label">
        Date
      </label>
      <Input
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
      <Input
        placeholder="e.g John Doe"
        type="text"
        name="vendor"
        id="vendor"
        className="form-input"
        onChange={(e) => setVendor(e.target.value)}
        value={vendor}
        maxLength={40}
        required
      />
      <br />

      <Form.Item style={{marginBottom:10}}>
        <UploadFile setCSV={setCSV}/>
      </Form.Item>

      <Button htmlType='submit' type="primary" block disabled={loading} onClick={handleSubmit}>
        {loading?<LoadingIcons.TailSpin height={22} width={22} stroke="black"/>:"Submit"}
      </Button>

      <Link to={"/orders"} style={{display:"block", textAlign:"center"}}>
        <Button block style={{marginTop:10, textAlign:"center"}}>
          Check All Orders Here
        </Button>
      </Link>
      </Form>
  );
};

export default OrderForm;
