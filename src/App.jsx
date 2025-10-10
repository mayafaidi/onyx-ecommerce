import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home/Home';
import Product from '../src/pages/products/product';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
