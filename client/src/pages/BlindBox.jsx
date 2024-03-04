import React, {useState} from 'react';
import {toast} from 'react-toastify';
import { SERVER_URL } from '../config'; // 请根据实际路径调整  //SERVER_URL+'

export default function BlindBox() {
 const [isLoading, setIsLoading] = useState(false);

    // src/pages/BlindBox.jsx
    const openBox = async () => {
        setIsLoading(true);
        try {
        const response = await fetch(`${SERVER_URL}/api/boxes/openbox`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': sessionStorage.getItem('auth_token'), // 确保已经添加auth-token
            },
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(`恭喜你获得了：${data.itemName}`);
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

 return (
 <div>
 <h2>盲盒开箱</h2>
 <button disabled={isLoading} onClick={openBox}>
 {isLoading ? '正在开箱...' : '打开盲盒'}
 </button>
 </div>
 );
}