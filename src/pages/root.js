import AppHeader from '../components/app-header/app-header';
import { Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import { MainPage } from './index';

const Root = () => {
  const { pathname } = useLocation();

  return (
    <>
      <AppHeader />
      {pathname === '/' ? <MainPage /> : <Outlet />}
    </>
  )
}

export default Root;