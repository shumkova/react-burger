import React, {useCallback, useEffect } from 'react';
import ErrorBoundary from '../error-boundary/error-doundary';
import { Route, Routes, useLocation} from 'react-router-dom';
import ProtectedRoute from '../protected-route';
import { Loader } from '../../ui/loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import {getAccessToken, getUser, USER_LOADED} from '../../services/actions/auth';
import { getIngredients } from '../../services/actions/ingredients';
import ProfileInfo from '../profile-info/profile-info';
import ModalIngredient from '../modal-ingredient';
import AppHeader from '../app-header/app-header';
import ErrorMessage from '../error-message/error-message';
import {
  MainPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPassword,
  ProfilePage,
  NotFound,
  OrdersPage,
  IngredientPage,
  FeedPage,
  OrderPage
} from '../../pages/index';
import { getCookie } from '../../utils/cookie';
import ModalOrderInfo from '../modal-order-info';
import { WS_ORDERS_START } from '../../services/actions/ws-orders';
import { WS_USER_ORDERS_START } from '../../services/actions/ws-orders-user';

const App = () => {
  const dispatch = useDispatch();
  const { wsOrdersConnected, wsOrdersConnecting, ordersError } = useSelector(state => state.orders);
  const { wsUserOrdersConnected, wsUserOrdersConnecting, userOrdersError } = useSelector(state => state.userOrders);
  const { user, userLoaded } = useSelector(state => state.auth);
  const { ingredients, ingredientsFailed } = useSelector(state => state.ingredients);
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  const accessToken = getCookie('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const checkUser = useCallback(() => { // минимизация запросов к серверу для определения пользователя

    const loggedOut = localStorage.getItem('loggedOut'); // пометка о том, что пользователь сам вышел из приложения, значит нет необходимости его автоматически логинить

    if (loggedOut || user) {
      dispatch({type: USER_LOADED});
      return;
    }

    if (accessToken) {
      dispatch(getUser());
    } else if (refreshToken) {
      dispatch(getAccessToken());
    } else {
      dispatch({type: USER_LOADED});
    }
  }, [user, dispatch, accessToken]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    checkUser();
    dispatch(getIngredients());
  }, [checkUser, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (location.pathname.includes('feed') && !wsOrdersConnected) {
      dispatch({
        type: WS_ORDERS_START
      });
    }
  }, [location.pathname, wsOrdersConnected, wsOrdersConnecting]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (location.pathname.includes('orders') && !wsUserOrdersConnected && accessToken) {
      dispatch({
        type: WS_USER_ORDERS_START
      })
    }
  }, [location.pathname, wsUserOrdersConnected, wsUserOrdersConnecting, dispatch, accessToken, user]);

  return (
    <ErrorBoundary>
      {ingredientsFailed || ordersError || userOrdersError ? <ErrorMessage /> :
        userLoaded && ingredients.length > 0 ?
          (<div className="page">
            <AppHeader />
            <Routes location={backgroundLocation || location}>
              <Route path={'/'} element={<MainPage />} />
              <Route path={'/ingredients/:id'} element={<IngredientPage />} />
              <Route path={'/login'} element={<ProtectedRoute anonymous={true} element={<LoginPage />} />} />
              <Route path={'/register'} element={<ProtectedRoute anonymous={true} element={<RegisterPage />} />} />
              <Route path={'/forgot-password'} element={<ProtectedRoute anonymous={true} element={<ForgotPasswordPage />} />} />
              <Route path={'/reset-password'} element={<ProtectedRoute anonymous={true} element={<ResetPassword />} />} />
              <Route path={'/profile'} element={<ProtectedRoute element={<ProfilePage />} />}>
                <Route path={''} element={<ProtectedRoute element={<ProfileInfo />} />} index />
                <Route path={'orders'} element={<ProtectedRoute element={<OrdersPage />} />} />
              </Route>
              <Route path={'/feed'} element={<FeedPage />} />
              <Route path={'/feed/:id'} element={<OrderPage />} />
              <Route path={'/profile/orders/:id'} element={<ProtectedRoute element={<OrderPage />}/> } />
              <Route path={'*'} element={<NotFound />} />
            </Routes>
            {backgroundLocation && (
              <Routes>
                <Route path="/ingredients/:id" element={<ModalIngredient />} />
                <Route path="/feed/:id" element={<ModalOrderInfo />} />
                <Route path="/profile/orders/:id" element={<ProtectedRoute element={<ModalOrderInfo />}/>} />
              </Routes>
            )}
          </div>)
          :
          <Loader size="large"/>
      }
    </ErrorBoundary>
  )
}

export default App;