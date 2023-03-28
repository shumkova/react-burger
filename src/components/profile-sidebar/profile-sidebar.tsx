import styles from './profile-sidebar.module.css';
import { Link, useLocation } from 'react-router-dom';
import React, { useCallback } from 'react';
import { signOut } from '../../services/actions/auth';
import { useAppDispatch } from '../../services/hooks';

const ProfileSidebar = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const logOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link
            to={'/profile'}
            className={`text text_type_main-medium ${styles.link} ${pathname === '/profile' ? styles.link_active : ''}`}
          >
            Профиль
          </Link>
        </li>
        <li>
          <Link
            to={'/profile/orders'}
            className={`text text_type_main-medium ${styles.link} ${pathname.includes('/orders') ? styles.link_active : ''}`}
          >
            История заказов
          </Link>
        </li>
        <li>
          <button
            onClick={logOut}
            type={'button'}
            className={`text text_type_main-medium ${styles.link}`}
          >
            Выход
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default ProfileSidebar;