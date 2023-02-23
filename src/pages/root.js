import AppHeader from '../components/app-header/app-header';
import { Outlet } from 'react-router-dom';
import React from 'react';

const Root = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  )
}

export default Root;