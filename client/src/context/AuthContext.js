// client\src\context\AuthContext.js
import { createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const registerUser = async (username, password) => {
    try {
      const res = await axios.post('http://localhost:4000/users/register', { username, password });
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