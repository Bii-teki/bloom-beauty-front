// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ loggedIn }) {
  return (
    <nav className="bg-black sticky top-0 z-10 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-white">
          Bloom Beauty
        </Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="nav-link">Home</Link></li>
          {loggedIn ? null : <li><Link to="/products" className="nav-link">Products</Link></li>}
           <li><Link to="/contact" className="nav-link">Contact</Link></li>
          {!loggedIn ? (
            <>
              <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
              <li><Link to="/login" className="nav-link">Login</Link></li>
             
            </>
          ) : (
            <>
            <li><Link to="/profile" className="nav-link">Profile</Link></li>
            <li><Link to="/logout" className="nav-link">Logout</Link></li>
          </>
            
          )}
          {/* <>
          <li><Link to="/admin" className="nav-link">Admin</Link></li>
          <li><Link to="/analytics" className="nav-link">Analytics</Link></li>
          </>
           */}
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
