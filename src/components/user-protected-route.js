import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ element }) => {
  const { user } = useSelector(state => state.auth);
  return user ? <Navigate to={'/'} replace /> : element;
}

export default UserProtectedRoute;