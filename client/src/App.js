import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import ProtectedRoute from './components/ProtectedRoute.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/' exact element={<Login />} /> {/* Redirect to login as default */} 
      </Routes>
    </Router>
  );
};

export default App;