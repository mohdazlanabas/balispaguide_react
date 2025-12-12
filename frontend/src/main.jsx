// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import HomePage from './pages/HomePage.jsx';
import LocationPage from './pages/LocationPage.jsx';
import TreatmentPage from './pages/TreatmentPage.jsx';
import CartPage from './pages/CartPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import StripePaymentPage from './pages/StripePaymentPage.jsx';
import PaymentSuccessPage from './pages/PaymentSuccessPage.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/locations/:location" element={<LocationPage />} />
          <Route path="/treatments" element={<TreatmentPage />} />
          <Route path="/treatments/:treatment" element={<TreatmentPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/stripe-payment" element={<StripePaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
