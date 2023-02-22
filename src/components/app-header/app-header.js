import React, { memo, useMemo } from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Link, useLocation } from 'react-router-dom';

const AppHeader = memo(() => {
  const { pathname } = useLocation();
  const isMain = useMemo(() => pathname === '/', [pathname]);

  return (
    <header className={styles.wrapper}>
      <div className={`${styles.container} pt-4 pb-4 `}>
        <nav>
          <ul className={styles.nav__list}>
            <li>
              <Link to={'/'} className={`${styles.link} ${isMain ? styles.link_active : ''} pt-4 pb-4 pl-5 pr-5`}>
                <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
                <span className="text text_type_main-default">Конструктор</span>
              </Link>
            </li>
            <li>
              <Link to={'/order'} className={`${styles.link} ${pathname === '/order' ? styles.link_active : ''} pt-4 pb-4 pl-5 pr-5`}>
                <ListIcon type={pathname === '/order' ? 'primary' : 'secondary'} />
                <span className="text text_type_main-default">Лента заказов</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.logo}>
          {
            isMain ?
              <Logo /> :
              <Link to={'/'}><Logo /></Link>
          }
        </div>
        <Link to={'/profile'} className={`${styles.link} ${styles.link_type_profile} ${pathname.includes('/profile') ? styles.link_active : ''} pt-4 pb-4 pl-5 pr-5`}>
          <ProfileIcon type={pathname.includes('/profile') ? 'primary' : 'secondary'} />
          <span className="text text_type_main-default">Личный кабинет</span>
        </Link>
      </div>
    </header>
  )
})

export default AppHeader;