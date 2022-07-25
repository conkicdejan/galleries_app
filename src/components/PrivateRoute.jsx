import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ isAuthenticated }) {
  const user = isAuthenticated;
  return user ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;
