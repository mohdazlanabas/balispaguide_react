import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { cartItems, userInfo, clearCart, getTotalPrice, formatPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Check on mount only
  React.useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
    const isComplete = cartItems.every(item => item.date && item.time);
    if (!isComplete) {
      navigate('/cart');
    }
  }, []); // Only check once on mount

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Get API base URL from environment variable
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

      // Send booking confirmation emails
      const response = await fetch(`${apiBase}/api/send-booking-emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInfo,
          cartItems
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to process booking');
      }

      // Log the result
      if (data.emailsSent) {
        console.log('✅ Emails sent successfully:', data);
        if (data.previewUrls) {
          console.log('📧 Preview URLs:', data.previewUrls);
        }
      } else {
        console.log('⚠️  Booking confirmed but emails not sent:', data.message);
      }

      // Navigate to Stripe payment page
      navigate('/stripe-payment');
    } catch (error) {
      console.error('Error processing payment:', error);
      setError(error.message || 'Failed to process booking. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <h1 className="page-title">Payment & Booking Summary</h1>

        <div className="payment-container">
          <div className="payment-summary">
            <h2>Your Bookings</h2>
            {cartItems.map((item, index) => (
              <div key={item.id} className="payment-item">
                <div className="payment-item-number">Booking {index + 1}</div>
                <div className="payment-item-details">
                  <h3>{item.spaName}</h3>
                  <p className="payment-location">{item.spaLocation}, Bali</p>
                  <div className="payment-treatment">
                    <strong>Treatment:</strong> {item.treatment}
                  </div>
                  <div className="payment-quantity">
                    <strong>Number of Packages:</strong> {item.quantity}
                  </div>
                  <div className="payment-price">
                    <strong>Price per Package:</strong> {formatPrice(item.price)}
                  </div>
                  {item.quantity > 1 && (
                    <div className="payment-subtotal">
                      <strong>Subtotal:</strong> {formatPrice(item.price * item.quantity)}
                    </div>
                  )}
                  <div className="payment-datetime">
                    <div>
                      <strong>Date:</strong> {new Date(item.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div>
                      <strong>Time:</strong> {item.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="payment-info">
            <div className="info-box">
              <h3>Important Information</h3>
              <ul>
                <li>Please arrive 10-15 minutes before your appointment</li>
                <li>Cancellations must be made at least 24 hours in advance</li>
                <li>Bring a valid ID for verification</li>
                <li>You will receive a confirmation email after payment</li>
              </ul>
            </div>

            <div className="payment-total">
              <h3>Total Bookings: {cartItems.length}</h3>
              <div style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 700 }}>
                Total: {formatPrice(getTotalPrice())}
              </div>
              <p className="note" style={{ marginTop: '1rem' }}>
                Payment to be made at the spa
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message" style={{
            background: '#fee2e2',
            border: '1px solid #ef4444',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1rem',
            color: '#991b1b'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="payment-actions">
          <button
            className="button-secondary"
            onClick={() => navigate('/cart')}
            disabled={isProcessing}
          >
            ← Back to Cart
          </button>
          <button
            className="button-primary"
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            style={{
              opacity: isProcessing ? 0.6 : 1,
              cursor: isProcessing ? 'not-allowed' : 'pointer'
            }}
          >
            {isProcessing ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
