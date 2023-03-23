import React, {useCallback, useEffect } from 'react';
import ErrorBoundary from '../error-boundary/error-doundary';
import { Route, Routes, useLocation} from 'react-router-dom';
import ProtectedRoute from '../protected-route';
import { Loader } from '../../ui/loader/loader';
import {getAccessTokenThunk, getUserThunk, USER_LOADED} from '../../services/actions/auth';
import { getIngredientsThunk } from '../../services/actions/ingredients';
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
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const App = () => {
  const dispatch = useAppDispatch();
  const { ordersError, userOrdersError } = useAppSelector(state => state.orders);
  const { user, userLoaded } = useAppSelector(state => state.auth);
  const { ingredients, ingredientsFailed } = useAppSelector(state => state.ingredients);
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  const checkUser = useCallback(() => { // минимизация запросов к серверу для определения пользователя
    const loggedOut = localStorage.getItem('loggedOut'); // пометка о том, что пользователь сам вышел из приложения, значит нет необходимости его автоматически логинить
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (loggedOut || user) {
      dispatch({ type: USER_LOADED });
      return;
    }

    if (accessToken) {
      dispatch(getUserThunk());
    } else if (refreshToken) {
      dispatch(getAccessTokenThunk());
    } else {
      dispatch({ type: USER_LOADED });
    }
  }, [user, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    checkUser();
    dispatch(getIngredientsThunk());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
              <Route path={'/registerThunk'} element={<ProtectedRoute anonymous={true} element={<RegisterPage />} />} />
              <Route path={'/forgot-password'} element={<ProtectedRoute anonymous={true} element={<ForgotPasswordPage />} />} />
              <Route path={'/reset-password'} element={<ProtectedRoute anonymous={true} element={<ResetPassword />} />} />
              <Route path={'/profile'} element={<ProtectedRoute element={<ProfilePage />} />}>
                <Route path={''} element={<ProtectedRoute element={<ProfileInfo />} />} index />
                <Route path={'orders'} element={<ProtectedRoute element={<OrdersPage />} />} />
              </Route>
              <Route path={'/feed'} element={<FeedPage />} />
              <Route path={'/feed/:id'} element={<OrderPage />} />
              <Route path={'/profile/orders/:id'} element={<ProtectedRoute element={<OrderPage privatePage={true} />}/> } />
              <Route path={'*'} element={<NotFound />} />
            </Routes>
            {backgroundLocation && (
              <Routes>
                <Route path="/ingredients/:id" element={<ModalIngredient />} />
                <Route path="/feed/:id" element={<OrderPage modal={true} />} />
                <Route path="/profile/orders/:id" element={<ProtectedRoute element={<OrderPage privatePage={true} modal={true} />}/>} />
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