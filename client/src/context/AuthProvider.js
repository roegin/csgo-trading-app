import React, { createContext, useState } from 'react';
import axios from 'axios';

import { SERVER_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === 'true');

  const registerUser = async (username, password) => {
    try {
      const response = await axios.post(`${SERVER_URL}/users/register`, { username, password });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.setItem('isAuthenticated', 'false');
    // 清除其他相关sessionStorage项，比如auth-token等
    sessionStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;