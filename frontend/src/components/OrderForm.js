import React, { useState } from 'react';
import './Form.css';
import { Link } from 'react-router-dom';
import LoadingIcons from 'react-loading-icons'
import { Button, Input, Form } from 'antd';
import { onFinish, onFinishFailed } from './notifications';
import UploadFile from './UploadFile';

const OrderForm = () => {
  const [loading, setLoading] = useState(false);
  const [csv, setCSV] = useState(null)

  const handleSubmit = async (values) => {
    setLoading(true);

    const { date, vendor } = values;

    const formData = new FormData();
    formData.append('csv', csv);
    formData.append('date', date);
    formData.append('vendor', vendor);

    // Extra measure in case someone changes required field from HTML
    if (!date || !vendor || !csv) {
      onFinishFailed("Form is incomplete.");
      setLoading(false);
      return;
    }
    // Check vendor name length as Validation
    if (vendor.length > 40) {
      onFinishFailed("Vendor name must be 40 characters or less.");
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

    // Date Validation
    if (selectedDate < minDate || selectedDate > maxDate) {
      onFinishFailed("Date must be within the last 100 years.");
      setLoading(false);
      return;
    }

    try {
      // Requesting Upload
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const resJson = await response.json()

      if (response.ok) {
        setLoading(false);
        onFinish();
      } else if (response.status === 400) {
        onFinishFailed(resJson.errors[0]);
        setLoading(false);
      } else {
        onFinishFailed('CSV file could not be uploaded.');
        setLoading(false);
      }
    } catch (error) {
      onFinishFailed('Something went wrong! Try again.');
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleSubmit} className="form-container">
      <h1 style={{ fontFamily: ['Inter', 'sans-serif'] }} className="form-title">Bulk Orders Form</h1>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please enter a date' }]}
      >
        <Input type="date" />
      </Form.Item>

      <Form.Item
        label="Vendor Name"
        name="vendor"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[
          { required: true, message: 'Please enter a vendor name' },
          { max: 40, message: 'Vendor name must be 40 characters or less' },
        ]}
      >
        <Input placeholder="e.g John Doe" maxLength={40} />
      </Form.Item>

      <Form.Item
        label="CSV File"
        name="csv"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={!csv&&[
          { required: true, message: 'Please attach a CSV.' }
        ]}
      >
        <UploadFile setCSV={setCSV} csv={csv} />
      </Form.Item>

      <Button htmlType="submit" type="primary" block disabled={loading}>
        {loading ? (
          <LoadingIcons.TailSpin height={22} width={22} stroke="black" />
        ) : (
          'Submit'
        )}
      </Button>

      <Link to="/orders" style={{ display: 'block', textAlign: 'center' }}>
        <Button block style={{ marginTop: 10, textAlign: 'center' }}>
          Check All Orders Here
        </Button>
      </Link>
    </Form>
  );
};

export default OrderForm;
