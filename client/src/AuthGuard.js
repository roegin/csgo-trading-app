import React from 'react';
import { useNavigate } from 'react-router-dom'; // 修改这行

export function withAuth(Component) {
  return (props) => {
    const navigate = useNavigate(); // 更新这行
    const auth_token = sessionStorage.getItem('auth_token');

    if (!auth_token) {
      navigate('/login'); // 更新这行
      return null;
    }

    return <Component {...props} />;
  };
}