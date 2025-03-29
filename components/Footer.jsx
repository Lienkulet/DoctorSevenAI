import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-text">
        <h1 className="footer-title">DoctorSeven</h1>
        <p className="footer-description">
          Effortlessly analyze medical-grade results and get tips for a better health - all in one platform.
        </p>
      </div>
      <div className="footer-buttons">
        <Link href="/chat" className="button1">Try now</Link>
        <Link href="/" className="button2">Back to Top</Link>
      </div>
    </div>
  );
};

export default Footer;
