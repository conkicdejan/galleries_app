import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute({ isAuthenticated }) {
  const user = isAuthenticated;
  return !user ? <Outlet /> : <Navigate to="/" replace />;
}

export default PublicRoute;
