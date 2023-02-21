import React, { useEffect} from 'react';
import ErrorBoundary from '../error-boundary/error-doundary';
import { Route, Routes, useLocation} from 'react-router-dom';
import ProtectedRoute from '../protected-route';
import { Loader } from '../../ui/loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/actions/auth';
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
  IngredientPage
} from '../../pages/index';

const App = () => {
  const dispatch = useDispatch();
  const { userLoaded } = useSelector(state => state.auth);
  const { ingredients, ingredientsFailed } = useSelector(state => state.ingredients);
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      {ingredientsFailed ? <ErrorMessage /> :
        userLoaded && ingredients.length > 0 ?
          (<div className="page">
            <AppHeader />
            <Routes location={backgroundLocation || location}>
              <Route path={'/'} element={<MainPage />} />
              <Route path={'/ingredients/:id'} element={<IngredientPage />} />
              <Route path={'/login'} element={<ProtectedRoute userPage={false} element={<LoginPage />} />} />
              <Route path={'/register'} element={<ProtectedRoute userPage={false} element={<RegisterPage />} />} />
              <Route path={'/forgot-password'} element={<ProtectedRoute userPage={false} element={<ForgotPasswordPage />} />} />
              <Route path={'/reset-password'} element={<ProtectedRoute userPage={false} element={<ResetPassword />} />} />
              <Route path={'/profile'} element={<ProtectedRoute element={<ProfilePage />} />}>
                <Route path={''} element={<ProtectedRoute element={<ProfileInfo />} />} index />
                <Route path={'orders'} element={<ProtectedRoute element={<OrdersPage />} />} />
              </Route>
              <Route path={'*'} element={<NotFound />} />
            </Routes>
            {backgroundLocation && (
              <Routes>
                <Route path="/ingredients/:id" element={<ModalIngredient />} />
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