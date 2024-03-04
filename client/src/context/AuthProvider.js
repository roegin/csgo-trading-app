// client\src\context\AuthProvider.js
// client\src\context\AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
import axios from 'axios';

import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'

const AuthProvider = ({children}) => {
 const [isAuthenticated, setIsAuthenticated] = useState(
  sessionStorage.getItem('isAuthenticated') === 'true'
 );

  useEffect(() => {
    // 应用加载时，检查sessionStorage里的认证状态
    const authStatus = sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
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

