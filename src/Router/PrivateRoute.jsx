import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("token"));
   




  return (
  <>
    {
      isAuthenticated ?
        children :
        <Navigate to="/login" />
    }


  </>)

}

export default PrivateRoute;
