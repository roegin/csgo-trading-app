// client\src\context\AuthProvider.js
import React, { useState } from 'react';
import AuthContext from "./AuthContext";
import axios from 'axios';

import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'

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
      const res = await axios.post(SERVER_URL+'/users/register', { username, password });
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

