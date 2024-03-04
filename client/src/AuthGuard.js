// AuthGuard.js - 创建一个高阶组件来包裹受保护的组件
import React from 'react';
import { useHistory } from 'react-router-dom';

export function withAuth(Component) {
  return (props) => {
    const history = useHistory();
    const auth_token = sessionStorage.getItem('auth_token');

    if (!auth_token) {
      history.push('/login');
      return null;
    }

    return <Component {...props} />;
  };
}