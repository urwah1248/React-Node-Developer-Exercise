import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Form from './components/Form';
import Table from './components/Table';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Form/>} />
          <Route path="/orders" element={<Table/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
