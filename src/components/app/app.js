import React, {useCallback, useEffect} from 'react';
import ErrorBoundary from '../error-boundary/error-doundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from '../protected-route';
import UserProtectedRoute from '../user-protected-route';
import { Loader } from '../../ui/loader/loader';
import {useDispatch, useSelector} from 'react-redux';
import {getAccessToken, getUser, USER_LOADED} from '../../services/actions/auth';
import {getCookie} from '../../utils/cookie';
import {getIngredients} from '../../services/actions/ingredients';

import {
  Root,
  MainPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPassword,
  ProfilePage,
  NotFound,
  OrdersPage
} from '../../pages/index';
import ProfileInfo from '../profile-info/profile-info';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <MainPage />,
        index: true
      },
      {
        path: '/login',
        element: <UserProtectedRoute element={<LoginPage />} />,
      },
      {
        path: '/register',
        element: <UserProtectedRoute element={<RegisterPage />} />,
      },
      {
        path: '/forgot-password',
        element: <UserProtectedRoute element={<ForgotPasswordPage />} />,
      },
      {
        path: '/reset-password',
        element: <UserProtectedRoute element={<ResetPassword />} />,
      },
      {
        path: '/profile',
        element: <ProtectedRoute element={<ProfilePage />} />,
        children: [
          {
            path: '/profile',
            element: <ProfileInfo />,
            index: true
          },
          {
            path: '/profile/orders',
            element: <OrdersPage />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ]
  },


  {
    path: '/ingredients/:id',
    element: <></>,
  },

]);

const App = () => {
  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector(state => state.auth);

  const checkUser = useCallback(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!user && !userLoaded) {
      if (accessToken) {
        dispatch(getUser());
      } else if (refreshToken) {
        dispatch(getAccessToken());
      } else {
        dispatch({
          type: USER_LOADED
        })
      }
    }
  }, [dispatch, user, userLoaded]);

  useEffect(() => {
    checkUser();
    dispatch(getIngredients());
  }, [checkUser, dispatch]);

  return (
    <ErrorBoundary>
      {
        userLoaded ?
          <div className="page">
            <RouterProvider router={router} />
          </div>
          :
          <Loader size="large"/>
      }
    </ErrorBoundary>
  )
}

export default App;