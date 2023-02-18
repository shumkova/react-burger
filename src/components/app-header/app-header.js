import React, { memo } from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import NavLink from '../nav-link/nav-link';
import PropTypes from 'prop-types';
import { APP_SECTION } from '../../utils/consts';

const AppHeader = memo(({activeLink}) => {
  return (
    <header className={styles.wrapper}>
      <div className={`${styles.container} pt-4 pb-4 `}>
        <nav>
          <ul className={styles.nav__list}>
            <li>
              <NavLink to={'/'} type={APP_SECTION.MAIN} isActive={activeLink === APP_SECTION.MAIN} text="Конструктор"/>
            </li>
            <li>
              <NavLink to={'/feed'} type={APP_SECTION.FEED} isActive={activeLink === APP_SECTION.FEED} text="Лента заказов"/>
            </li>
          </ul>
        </nav>

        <div className={styles.logo}>
          <Logo />
        </div>

        <NavLink to={'/profile'} type={APP_SECTION.PROFILE} isActive={activeLink === APP_SECTION.PROFILE} text="Личный кабинет"/>
      </div>
    </header>
  )
})

AppHeader.propTypes = {
  activeLink: PropTypes.string.isRequired
}

export default AppHeader;