import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import Table from './components/Table';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<OrderForm/>} />
          <Route path="/orders" element={<Table/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
