import React, {useState,useContext} from 'react';
import {toast} from 'react-toastify';
import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function BlindBox() {
    const { isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
        // client/src/pages/BlindBox.jsx
    const [openedItem, setOpenedItem] = useState(null);
  
    const openBox = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_URL}/api/boxes/openbox`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': sessionStorage.getItem('auth_token'),
          },
        });
        const data = await response.json();
        if (response.ok) {
          setOpenedItem(data.item); // 保存开出的物品信息
          toast.success(`恭喜你获得了：${data.item.itemName}`);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('网络错误，请稍后再试');
      } finally {
        setIsLoading(false);
      }
    };
    // 如果用户未登录，则重定向到登录页面
    if (!isAuthenticated) {
      return <Navigate replace to="/login" />;
    }
  
    return (
      <div>
        {openedItem && (
          <div>恭喜你获得了：{openedItem.itemName}</div>
        )}
        <h2>盲盒开箱</h2>
        <button disabled={isLoading} onClick={openBox}>
          {isLoading ? '正在开箱...' : '打开盲盒'}
        </button>
      </div>
    );
  }