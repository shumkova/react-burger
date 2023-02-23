import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './profile.module.css';
import ProfileSidebar from '../components/profile-sidebar/profile-sidebar';

const ProfilePage = () => {
  return (
    <main className={`container ${styles.container}`}>
      <section className={`${styles.sidebar} mr-15`}>
        <ProfileSidebar />
        <p className={`text text_type_main-default text_color_inactive mt-20 ${styles.tip}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>

      <Outlet />
    </main>
  )
};

export default ProfilePage;