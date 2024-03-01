// client\src\components\UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getUserId} from "../utilities/Utilities";
import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'

const UserProfile = () => {
 const [user, setUser] = useState(null);

  // Get user info
  const getUser = async () => {
    try {
      const auth_token = sessionStorage.getItem('auth_token');

      const response = await axios.get(SERVER_URL+"/users/profile/" + getUserId(auth_token), {
        headers: { 
          'Content-Type': 'application/json',
          'auth-token': auth_token 
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error('获取用户信息报错',error.response);
    }
  };
 // 当组件挂载时，获取用户信息
 useEffect(() => {
 getUser();
 }, [getUser]); // 添加 getUser 为依赖项

 return (
 <div>
  {user && (
    <div>
      <h1>用户名:{user.username}</h1>
      <p>Account balance: {user.currency.value}</p>
    </div>
  )}
 </div>
 );
};

export default UserProfile;