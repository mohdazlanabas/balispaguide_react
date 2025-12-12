import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { cartItems, userInfo, formatPrice, clearCart } = useCart();

  // Redirect if no cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, []);

  if (cartItems.length === 0) {
    return null;
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <div className="confirmation-page">
          <div className="confirmation-header">
            <div className="success-icon">✓</div>
            <h1 className="page-title">Booking Confirmation</h1>
            <p className="confirmation-subtitle">
              Your spa booking has been confirmed!
            </p>
          </div>

          <button
            className="button-secondary back-to-booking-btn"
            onClick={() => {
              clearCart();
              navigate('/');
            }}
          >
            ← Back To Spa Booking
          </button>

          {/* Payment Details Section */}
          <div className="confirmation-section">
            <h2 className="section-header">Payment Details</h2>
            <div className="booking-items">
              {cartItems.map((item, index) => (
                <div key={item.id} className="confirmation-item">
                  <div className="item-number">Booking {index + 1}</div>
                  <div className="item-details">
                    <h3>{item.spaName}</h3>
                    <p className="item-location">{item.spaLocation}</p>
                    <div className="detail-row">
                      <strong>Treatment:</strong> {item.treatment}
                    </div>
                    <div className="detail-row">
                      <strong>Number of Packages:</strong> {item.quantity}
                    </div>
                    <div className="detail-row">
                      <strong>Price per Package:</strong> {formatPrice(item.price)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="detail-row subtotal">
                        <strong>Subtotal:</strong> {formatPrice(item.price * item.quantity)}
                      </div>
                    )}
                    <div className="detail-row">
                      <strong>Date:</strong> {new Date(item.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="detail-row">
                      <strong>Time:</strong> {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="total-amount">
              <h3>Total Amount: {formatPrice(totalPrice)}</h3>
              <p className="payment-note">Payment to be made at the spa</p>
            </div>
          </div>

          {/* Email to Customer Section */}
          <div className="confirmation-section customer-email-section">
            <h2 className="section-header">Email to Customer ({userInfo.email})</h2>
            <div className="email-preview">
              <div className="email-item">
                <strong>Booking confirmation with all details</strong>
              </div>
              {cartItems.map((item, index) => (
                <div key={item.id} className="email-booking-item">
                  <h4>Booking {index + 1}:</h4>
                  <ul>
                    <li><strong>Spa:</strong> {item.spaName}</li>
                    <li><strong>Location:</strong> {item.spaLocation}</li>
                    <li><strong>Address:</strong> Bali, Indonesia</li>
                    <li><strong>Contact:</strong> (to be provided by spa)</li>
                    <li><strong>Treatment Type:</strong> {item.treatment}</li>
                    <li><strong>Number of Packages:</strong> {item.quantity}</li>
                    <li><strong>Date:</strong> {new Date(item.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</li>
                    <li><strong>Time:</strong> {item.time}</li>
                    <li><strong>Price:</strong> {formatPrice(item.price * item.quantity)}</li>
                  </ul>
                </div>
              ))}
              <div className="email-item">
                <strong>Total Price:</strong> {formatPrice(totalPrice)}
              </div>
              <div className="email-item">
                <strong>Customer Contact Information:</strong>
                <ul>
                  <li>Name: {userInfo.name}</li>
                  <li>Email: {userInfo.email}</li>
                  <li>Phone: {userInfo.phone}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Email to Spa Section */}
          <div className="confirmation-section spa-email-section">
            <h2 className="section-header">Email to Spa (azlan@net1io.com)</h2>
            <div className="email-preview">
              <div className="email-item">
                <strong>Customer Details:</strong>
                <ul>
                  <li>Name: {userInfo.name}</li>
                  <li>Phone: {userInfo.phone}</li>
                  <li>Email: {userInfo.email}</li>
                </ul>
              </div>
              {cartItems.map((item, index) => (
                <div key={item.id} className="email-booking-item">
                  <h4>Booking {index + 1}:</h4>
                  <ul>
                    <li><strong>Spa:</strong> {item.spaName}</li>
                    <li><strong>Location:</strong> {item.spaLocation}</li>
                    <li><strong>Address:</strong> Bali, Indonesia</li>
                    <li><strong>Treatment Type:</strong> {item.treatment}</li>
                    <li><strong>Number of Packages:</strong> {item.quantity}</li>
                    <li><strong>Date:</strong> {new Date(item.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</li>
                    <li><strong>Time:</strong> {item.time}</li>
                    <li><strong>Price:</strong> {formatPrice(item.price * item.quantity)}</li>
                  </ul>
                </div>
              ))}
              <div className="email-item">
                <strong>Total Amount:</strong> {formatPrice(totalPrice)}
              </div>
            </div>
          </div>

          <div className="confirmation-footer">
            <button
              className="button-primary"
              onClick={() => {
                clearCart();
                navigate('/');
              }}
            >
              Back To Spa Booking
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
