import React, { useState, useEffect } from 'react';
import AuthContext from "./AuthContext";
import axios from 'axios';

import { SERVER_URL } from '../config'; // 请根据实际路径调整

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    const storedIsAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (storedIsAuthenticated !== isAuthenticated) {
      setIsAuthenticated(storedIsAuthenticated);
    }
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
      const res = await axios.post(`${SERVER_URL}/users/register`, { username, password });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;