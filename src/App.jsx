import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home/Home';
import Product from '../src/pages/products/product';
import Profile from '../src/pages/profile/Profile';
import Login from '../src/pages/login/Login';
import Register from '../src/pages/register/Register';
import ForgotPassword from '../src/pages/forgetpassword/Forgetpassword';
import ResetPassword from '../src/pages/resetpassword/Resetpassword';
import About from '../src/pages/about/About';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cart from './pages/cart/Cart';

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
          <Route path='/About' element={<About />} />

          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />

          <Route path='/cart' element={<Cart />} />

        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
