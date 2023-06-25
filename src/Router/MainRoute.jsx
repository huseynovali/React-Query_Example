import React from 'react';
import AdminPage from '../page/AdminPage';
import Login from '../page/Login';
import { Routes, Route } from 'react-router-dom';
import Home from '../page/Home';
import UserDetail from '../page/UserDetail';
import NavLayout from '../components/NavLayout';
import PrivateRoute from './PrivateRoute';

function MainRoute() {
    return (
        <Routes>
            <Route path="/" element={<NavLayout />} >
                <Route index element={<Home />} />
                <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default MainRoute;
