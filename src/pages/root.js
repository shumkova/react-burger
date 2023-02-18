import AppHeader from "../components/app-header/app-header";
import {Outlet, useHref} from "react-router-dom";
import React from "react";
import { MainPage } from './index';
import { useSelector} from "react-redux";

const Root = () => {
  const { activeSection } = useSelector(state => state.app);
  const url = useHref();

  return (
    <>
      <AppHeader activeLink={activeSection}/>
      {url === '/' ? <MainPage /> : <Outlet />}
    </>
  )
}

export default Root;