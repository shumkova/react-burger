import React, { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../services/hooks';

interface IProtectedRoute {
  element: ReactElement;
  anonymous?: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ element, anonymous = false }) => {
  const { loggedIn } = useAppSelector(state => state.auth);
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