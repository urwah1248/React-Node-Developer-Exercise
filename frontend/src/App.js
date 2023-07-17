import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import OrderForm from './pages/OrderForm';
import OrdersTable from './pages/OrdersTable';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<OrderForm/>} />
          <Route path="/orders" element={<OrdersTable/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
