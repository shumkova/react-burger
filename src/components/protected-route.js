import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element, anonymous = false }) => {
  const { loggedIn } = useSelector(state => state.auth);
  const { pathname } = useLocation();
  const { state } = useLocation();

  const from = state?.from || '/';

  if (loggedIn && anonymous) {
    return <Navigate to={from} />
  }

  if (!loggedIn && !anonymous) {
    return <Navigate to={'/login'} replace={false} state={{...state, from: pathname}}/>
  }

  return element;
}

export default ProtectedRoute;