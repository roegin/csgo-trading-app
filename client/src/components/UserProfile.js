// client\src\components\UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getUserId} from "../utilities/Utilities";
import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

 

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
        console.log('测试-充值成功')
        setUser(prevUser => ({...prevUser, currency: { value: response.data.value }}));
        getUser();
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

  // 获取用户物品信息的函数
  // client/src/components/UserProfile.js 中获取用户物品信息的部分
  const getUserItems = async () => {
    try {
      const auth_token = sessionStorage.getItem('auth_token');
      // 更新请求路径以匹配服务端路由
      const response = await axios.get(`${SERVER_URL}/users/${getUserId(auth_token)}/items`, {
        headers: { 'auth-token': auth_token },
      });

      if(response.status === 200) {
        setItems(response.data); // 假设 setUserItems 会更新状态以展示物品列表
      }
    } catch (error) {
      console.error('获取用户物品信息失败', error.response);
    }
  };

  useEffect(() => {

      getUser();
      getUserItems();
  }, []); // 添加 getUser 为依赖项

  return (
    <div>
      <h1>用户信息</h1>
      {user && (
        <div>
          <p>用户名: {user.username}</p>
          {/* 显示用户其他信息 */}
        </div>
      )}
      <h2>我的物品列表</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name} - {item.description}</li> // 根据你的数据结构调整这里的字段名
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;