import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../../utils/auth';

const ProtectedRoute = ({ allowedRoles }) => {
  const auth = isAuthenticated();
  const userRole = getUserRole();

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; 
  }

  return <Outlet />; 
};
export default ProtectedRoute;