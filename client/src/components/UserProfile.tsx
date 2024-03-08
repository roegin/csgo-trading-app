// client\src\components\UserProfile.js
//@ts-nocheck
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getUserId} from "../utilities/Utilities";
import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'


import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/card';

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
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>个人中心</CardTitle>
          <CardDescription>欢迎, 您的余额是 {user?.currency?.value || 0}. 您可以在下方充值您的账户。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-3xl font-bold">{user?.currency?.value || 0}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">账户余额</div>
            </div>
            <div>
              <div className="flex flex-col gap-1">
                <Label className="text-sm" htmlFor="recharge">
                  充值金额
                </Label>
                <Input id="recharge" placeholder="$ 输入金额" value={rechargeAmount} onChange={(e) => setRechargeAmount(e.target.value)} />
              </div>
              <Button className="w-full" onClick={() => recharge(rechargeAmount)}>充值</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>我的物品</CardTitle>
          <CardDescription>您购买了以下物品。享受您的购物！</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  alt="Thumbnail"
                  className="rounded-lg"
                  height="100"
                  src={item.imageUrl || "/placeholder.svg"} // 假设每个物品有 imageUrl 属性
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                  width="100"
                />
                <div className="grid gap-1 text-sm">
                  <div className="font-semibold">{item.itemName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfile;