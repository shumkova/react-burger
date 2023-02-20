import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const { user } = useSelector(state => state.auth);
  const { pathname } = useLocation();
  const url = window.location.href;

  return user ? element : <Navigate to={'/login'} replace={false} state={[{path: pathname, url}]} />;
}

export default ProtectedRoute;