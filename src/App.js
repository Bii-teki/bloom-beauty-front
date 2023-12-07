// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Products from './Components/User/Products';
import Footer from './Components/Home/Footer';
import Navbar from './Components/Home/Navbar';
import Login from './Components/Home/Login';
import SignUp from './Components/Home/Signup';
import Profile from './Components/User/Profile';
import Home from './Components/Admin/Home';
import Home1 from './Home1';
import Logout from './Components/Home/Logout';
import Products_analytics from './Components/Admin/Products_analytics';



function App() {

  const initialLoginState = localStorage.getItem('loggedIn') === 'true';
  const [login, setLogin] = useState(initialLoginState);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(null);  
  const handleLogout = () => {
    setLogin(false);
  };

  useEffect(() => {
   
    localStorage.setItem('loggedIn', login.toString());
  }, [login]);


  return (
    <Router>
      <Navbar loggedIn={login} admin={admin} user={user} />    
      

      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/products" element={<Products login={login} setAdmin={setAdmin} setUser={setUser}  />} />
        <Route path="/login" element={<Login  setLogin={setLogin} setUser={setUser}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile setUser={setUser}  />} />
        <Route path="/admin" element={<Home />} />  
        <Route path="/analytics" element={<Products_analytics />} /> 
        <Route path="/logout" element={<Logout onLogout={handleLogout} />}/>      
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
