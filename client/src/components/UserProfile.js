// client\src\components\UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'

const UserProfile = () => {
 const [user, setUser] = useState(null);

  // 获取用户信息的函数
  const getUser = async () => {
    try {
      // Retrieve the token from sessionStorage
      const token = sessionStorage.getItem('token');

      // Send the token in the Authorization header
      const response = await axios.get(SERVER_URL+"/users/profile", {
        headers: {                 'auth-token': token }
      });

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

 // 当组件挂载时，获取用户信息
 useEffect(() => {
 getUser();
 }, []);

 return (
 <div>
  {user && (
    <div>
      <h1>{user.username}</h1>
      <p>Account balance: {user.currency.value}</p>
    </div>
  )}
 </div>
 );
};

export default UserProfile;