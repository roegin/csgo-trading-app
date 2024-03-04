// client\src\components\UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getUserId} from "../utilities/Utilities";
import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'

import { toast } from 'react-toastify';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [rechargeAmount, setRechargeAmount] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = sessionStorage.getItem('auth_token');
      try {
        const response = await axios.get(`${SERVER_URL}/users/profile/${getUserId(authToken)}`, {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        });

        setUser(response.data);
        setItems(response.data.items); // 假设response.data.items是用户物品列表
      } catch (error) {
        console.error('获取用户信息失败', error.response);
        toast.error('获取用户信息失败');
      }
    };

    fetchUserProfile();
  }, []);

  const handleRecharge = async () => {
    const authToken = sessionStorage.getItem('auth_token');
    try {
      const response = await axios.post(`${SERVER_URL}/users/recharge/${getUserId(authToken)}`, 
        { rechargeValue: rechargeAmount }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success('充值成功');
        setUser(prevState => ({ ...prevState, currency: { value: prevState.currency.value + Number(rechargeAmount) }})); // 更新用户余额
        setRechargeAmount(''); // 清空充值金额输入框
      }
    } catch (error) {
      console.error('充值失败', error.response);
      toast.error('充值失败');
    }
  };

  return (
    <div>
      {user && (
        <div>
          <h1>用户名: {user.username}</h1>
          <p>账户余额: {user.currency?.value || 0}</p>

          <input 
            type="number"
            placeholder="充值金额"
            value={rechargeAmount}
            onChange={(e) => setRechargeAmount(e.target.value)}
          />
          <button onClick={handleRecharge}>充值</button>
        </div>
      )}

      <h2>我的物品列表</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.itemName} - {item.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;