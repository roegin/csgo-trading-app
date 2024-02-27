// client\src\components\Register.js
import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // 新增

const register = async () => {
  try {
    const response = await registerUser(username, password);

    if (response.status === 200) {
      setMessage(response.data.msg);
    }
  } catch (error) {
    console.log('error',error)
    // 检查 error 对象是否包含 response 属性
    if(error.response){
      setMessage(error.response.data.msg); // 如果服务器返回了错误信息，则显示
    } else {
        console.log(error)
      setMessage('An error occurred.'); // 否则显示一般错误信息
    }
  }
};

  return (
    <div>
      <input type="text" placeholder="用户名" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="密码" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={register}>注册</button>
      {/* 新增：显示消息 */}
      {message && <div>{message}</div>}
    </div>
  );
};

export default Register;