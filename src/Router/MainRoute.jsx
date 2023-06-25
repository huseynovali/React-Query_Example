import React from 'react';
import AdminPage from '../page/AdminPage';
import Login from '../page/Login';
import { Routes, Route } from 'react-router-dom';
import Home from '../page/Home';
import UserDetail from '../page/UserDetail';
import NavLayout from '../components/NavLayout';
import PrivateRoute from './PrivateRoute';
import Register from "../page/Register"
function MainRoute() {
    return (
        <Routes>
            <Route path="/" element={<NavLayout />} >
                <Route index element={<Home />} />
                <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

            </Route>

        </Routes>
    );
}

export default MainRoute;
