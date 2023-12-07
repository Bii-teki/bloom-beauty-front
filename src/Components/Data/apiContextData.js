// apiContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
const APIContext = createContext();
// const BASE_URL = 'http://127.0.0.1:5555';

const BASE_URL = 'https://bloom-beauty.onrender.com';
export function useAPIContext() {
  return useContext(APIContext);
}

export function APIProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(<Loading />);
  const [tokens, setTokens] = useState("");

  useEffect(() => {
    // Fetch users from your Flask API endpoint
    axios.get(`${BASE_URL}/clients`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    // Fetch projects from your Flask API endpoint
    axios.get(`${BASE_URL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setLoading(false);
      });

   

 // Fetch login from your Flask API endpoint
 axios.post(`${BASE_URL}/login`)
 .then((response) => {
   setTokens(response.data);
 })
 .catch((error) => {
   console.error('Error fetching users:', error);
 })
 .finally(() => {
   setLoading(false);
 });

  }, []);

  
  

  return (
    <APIContext.Provider value={{ users, products, tokens, loading }}>
      {children}
    </APIContext.Provider>
  );
}