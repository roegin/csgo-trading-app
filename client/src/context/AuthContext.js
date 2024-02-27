// client\src\context\AuthContext.js
import { createContext } from 'react';
import axios from 'axios';

import { SERVER_URL } from '../../config'; // 请根据实际路径调整  //SERVER_URL+'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const registerUser = async (username, password) => {
    try {
      const res = await axios.post(SERVER_URL+'/users/register', { username, password });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;