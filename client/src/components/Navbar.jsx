import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import '../styles/components/Navbar.css';

export default function Navbar() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        authContext.logout();
        navigate('/login');
    };

    return (
        <header className="navbar">
            <div className="navbar-logo">
                <h1>BUFF</h1>
            </div>
            <nav className="navbar-menu">
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="active-link" className="navbar-link" exact>
                            Trades
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/offers" activeClassName="active-link" className="navbar-link">
                            Offers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create" activeClassName="active-link" className="navbar-link">
                            Create
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="navbar-login-logout">
                {
                    authContext.isAuthenticated ?
                        (<NavLink to="/login" className="log-link" onClick={handleLogout}>登出</NavLink>) :
                        (
                          <>
                            <NavLink to="/login" className="log-link" style={{backgroundColor: 'lightblue', borderRadius: '5px'}}>登录</NavLink>
                            <NavLink to="/register" className="log-link" style={{backgroundColor: 'lightgreen', borderRadius: '5px', marginLeft: '10px'}}>注册</NavLink>
                          </>
                        )
                }
            </div>
        </header>
    );
}