import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element, userPage = true }) => {
  const { loggedIn } = useSelector(state => state.auth);
  const { pathname } = useLocation();
  const { state } = useLocation();

  const lastPath = state && state.lastPath;

  if (loggedIn && !userPage) {
    return <Navigate to={lastPath || '/'} replace />
  }

  if (!loggedIn && userPage) {
    return <Navigate to={'/login'} replace={false} state={{...state, lastPath: pathname}}/>
  }

  return element;
}

export default ProtectedRoute;