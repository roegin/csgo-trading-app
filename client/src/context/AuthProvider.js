// client\src\context\AuthProvider.js
import React, { useState } from 'react';
import AuthContext from "./AuthContext";
import axios from 'axios';

const AuthProvider = ({children}) => {
 const [isAuthenticated, setIsAuthenticated] = useState(
 sessionStorage.getItem('isAuthenticated') === 'true'
 );

 const login = () => {
 setIsAuthenticated(true);
 };

 const logout = () => {
 setIsAuthenticated(false);
 };

  const registerUser = async (username, password) => {
    try {
      const res = await axios.post('http://alex.shinestu.com:4000/users/register', { username, password });
      console.log(res.data);
      return res
    } catch (err) {
      console.error(err);
    }
  };

 return (
 <AuthContext.Provider value={{isAuthenticated, login, logout, registerUser}}>
 {children}
 </AuthContext.Provider>
 );
};

export default AuthProvider;

