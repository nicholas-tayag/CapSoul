import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-6">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          <h1>CapSoul</h1>
        </div>
        <ul className="flex space-x-8">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#about" className="hover:underline">About</a></li>
          <li><a href="#services" className="hover:underline">Services</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;