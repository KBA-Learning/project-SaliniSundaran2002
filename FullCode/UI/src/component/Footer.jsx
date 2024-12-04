import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="footer-container max-w-4xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
        <div className="footer-section">
          <h3 className="font-bold">About Us</h3>
          <p>We provide the best services for our clients. Our mission is to deliver high-quality products.</p>
        </div>

        <div className="footer-section">
          <h3 className="font-bold">Quick Links</h3>
          <ul>
            <li><a href="#" className="text-sky-400 hover:underline">Home</a></li>
            <li><a href="#" className="text-sky-400 hover:underline">Services</a></li>
            <li><a href="#" className="text-sky-400 hover:underline">Contact</a></li>
            <li><a href="#" className="text-sky-400 hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="font-bold">Contact Us</h3>
          <p>Email: onboard@orbit.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Street, TVM, INDIA</p>
        </div>
      </div>

      <div className="footer-bottom text-center p-2 bg-gray-700 text-xs sm:text-sm">
        <p>&copy; 2024 Onboard Orbit. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
