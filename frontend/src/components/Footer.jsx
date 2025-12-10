// frontend/src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div>
        © {new Date().getFullYear()} Bali Spa Directory. All rights reserved.
      </div>
      <div>
        <a href="#">About</a> · <a href="#">Add your spa</a> ·{' '}
        <a href="#">Contact</a>
      </div>
    </footer>
  );
}

