// AuthGuard.js 示例
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContext'; // 确保导入正确的上下文

export function withAuth(Component) {
  return (props) => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext); // 使用AuthContext

    if (!authContext.isAuthenticated) { // 判断是否登录
      navigate('/login');
      return null;
    }

    return <Component {...props} />;
  };
}