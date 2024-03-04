import React, {useState} from 'react';
import {toast} from 'react-toastify';

export default function BlindBox() {
 const [isLoading, setIsLoading] = useState(false);

 const openBox = async () => {
    setIsLoading(true);
    try {
        const response = await fetch(`${SERVER_URL}/openbox`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify({userId}) // 传递必要信息，如用户ID
        });
        const data = await response.json();
        if (response.ok) {
            toast.success(`恭喜你获得了：${data.itemName}`);
        } else {
            toast.error(data.message);
        }
        setIsLoading(false);
    } catch (error) {
        console.error(error);
        toast.error('网络错误，请稍后再试');
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