import React, {useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import jwtDecode from 'jwt-decode';
import '../../styles/components/LoginForm.css'
import axios from 'axios'; // 确保已经引入axios

import { SERVER_URL } from '../../config'; // 请根据实际路径调整  //SERVER_URL+'

export default function LoginForm() {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const auth_token = sessionStorage.getItem('auth_token');
        if (auth_token !== null) {
            console.log('Auth token present');
            redirect(auth_token);
        } else {
            console.log('No Auth token present');
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        let error = document.getElementById("error-text");
      
        const requestBody = {
          username,
          password
        }
      
        try {
          const response = await axios.post(SERVER_URL+"/users/login", requestBody, {
            headers: {
              "Content-Type": 'application/json'
            }
          });
      
          if (response.status !== 200) {
            error.innerHTML = response.data.msg;
          } else {
            sessionStorage.setItem('auth_token', response.data.token);
            sessionStorage.setItem('isAuthenticated', 'true');
            authContext.login();
            console.log('测试-authContext',useContext(AuthContext))
            redirect(response.data.token);
          }
        } catch (err) {
          if (err.response) {
            // 当响应状态码超出2xx范围时执行
            console.log(err.response.data);
            error.innerHTML = err.response.data.msg;
          } else if (err.request) {
            // 请求已发出但未收到响应时执行
            console.log(err.request);
          } else {
            // 在设置请求时触发了某些问题时执行
            console.log('Error', err.message);
          }
        }
      };

    const navigate = useNavigate();

    async function redirect(token) {
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;

        const userResponse = await fetch(`${SERVER_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (userResponse.status === 200) {
            navigate('/');
        } else {
            console.log('Error retrieving data.')
        }
    }

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="login-elements">
                    <input type="text" id="username" name="username" placeholder="Username"/>
                    <input type="password" id="password" name="password" placeholder="Password"/>
                    <div className="error" id="error-text"></div>
                </div>
                <button className="login-button">Log In</button>
            </form>
        </div>
    );
}