// client\src\components\UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getUserId} from "../utilities/Utilities";
import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'

const UserProfile = () => {
 const [user, setUser] = useState(null);

// Define rechargeAmount and setRechargeAmount
const [rechargeAmount, setRechargeAmount] = useState(0)
  const recharge = async (amount) => {
    try {
      const auth_token = sessionStorage.getItem('auth_token');
      const response = await axios.post(SERVER_URL+"/users/recharge/" + getUserId(auth_token), { rechargeValue: amount }, {
        headers: { 
          'Content-Type': 'application/json',
          'auth-token': auth_token 
        },
      });

      if(response.data.message === 'Recharge successful') {
        setUser(prevUser => ({...prevUser, currency: { value: response.data.value }}));
      }
    } catch (error) {
      console.error('充值失败',error.response);
    }
  };

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
 }, []); // 添加 getUser 为依赖项

 return (
  <div>
  {user && (
   <div>
    <h1>用户名:{user.username}</h1>
    <p>Account balance: {user.currency?.value}</p>
    <input type="number" onChange={(e) => setRechargeAmount(e.target.value)} />
    <button onClick={() => recharge(rechargeAmount)}>充值</button>
   </div>
  )}
 </div>
 );
};

export default UserProfile;