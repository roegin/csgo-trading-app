// client\src\App.js
//@ts-nocheck
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Offers from "./pages/Offers";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Register from "./components/Register";
import MakeOffer from "./pages/MakeOffer";
import AuthProvider from "./context/AuthProvider";
import UserProfile from "./components/UserProfile"; // Import the new component

import BlindBox from "./pages/BlindBox"; // 引入盲盒组件

import { withAuth } from './AuthGuard';

export default function App() {
    const { isAuthenticated } = useContext(AuthContext);
    console.log('isAuthenticated',isAuthenticated)
 return (

    <Router>
        <AuthProvider>
            <Navbar/>
            <Routes>
                <Route path='/' exact element={<Index/>}/>
                <Route path='/offers' element={<Offers/>}/>
                <Route path='/create' element={<Create/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/> {/* 新增 */}
                <Route path='offers/:_id' element={<MakeOffer/>}/>
                <Route path='/profile' element={<UserProfile/>}/> {/* Add this line */}
                <Route
                    path="/blindbox"
                    element= {<BlindBox />} />
        
            </Routes>
        </AuthProvider>
    </Router>
 
 );
}