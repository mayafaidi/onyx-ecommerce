import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home/Home';
import Product from '../src/pages/products/product';
import Profile from '../src/pages/profile/Profile';
import Login from '../src/pages/login/Login';
import Register from '../src/pages/register/Register';
import ForgotPassword from '../src/pages/forgetpassword/Forgetpassword';
import ResetPassword from '../src/pages/resetpassword/Resetpassword';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
