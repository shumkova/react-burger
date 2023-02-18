import React from "react";
import { Outlet, useHref } from "react-router-dom";
import styles from './profile.module.css';
import Sidebar from "../components/sidebar/sidebar";
import ProfileInfo from "../components/profile-info/profile-info";
import {PROFILE_SECTION} from "../utils/consts";


const ProfilePage = () => {
  const url = useHref();
  const isIndex = url.replace(PROFILE_SECTION.INDEX, '').length <= 1;

  return (
    <main className={`container ${styles.container}`}>
      <section className={`${styles.sidebar} mr-15`}>
        <Sidebar />
        <p className={`text text_type_main-default text_color_inactive mt-20 ${styles.tip}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>

      {isIndex ? <ProfileInfo /> : <Outlet />}
    </main>
  )
};

export default ProfilePage;