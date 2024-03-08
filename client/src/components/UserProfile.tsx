// client\src\components\UserProfile.js
//@ts-nocheck
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getUserId} from "../utilities/Utilities";
import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'


import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '../components/ui/card';

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
    <Card>
      <CardHeader>个人中心</CardHeader>
      <CardContent>
        {user && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-3xl font-bold">$100.00</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">账户余额</div>
              </div>
              <div>
                <Label>充值金额</Label>
                <Input type="number" value={rechargeAmount} onChange={e => setRechargeAmount(e.target.value)} />
                <Button onClick={() => recharge(rechargeAmount)}>充值</Button>
              </div>
            </div>

            <CardTitle>用户名: {user.username}</CardTitle>
            <CardDescription>账户余额: {user.currency?.value || 0}</CardDescription>

            <CardTitle>我的物品列表</CardTitle>
            {items.map((item, index) => (
              <CardDescription key={index}>{item.itemName} - {item.description}</CardDescription>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;