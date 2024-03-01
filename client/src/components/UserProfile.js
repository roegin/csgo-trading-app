// client\src\components\UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
 const [user, setUser] = useState(null);

 // 获取用户信息的函数
 const getUser = async () => {
 try {
  const response = await axios.get("/users/profile"); // Assumes user is already logged in
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