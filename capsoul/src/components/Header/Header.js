import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-custom-dark-blue text-white p-6">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:underline">
            <h1>CapSoul</h1>
          </Link>
        </div>
        <ul className="flex space-x-8">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/services" className="hover:underline">Services</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
