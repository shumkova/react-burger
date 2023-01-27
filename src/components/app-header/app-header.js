import React, { memo } from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import NavLink from '../nav-link/nav-link';
import PropTypes from 'prop-types';

const AppHeader = memo(({activeLink}) => {
  return (
    <header className={styles.wrapper}>
      <div className={`${styles.container} pt-4 pb-4 `}>
        <nav>
          <ul className={styles.nav__list}>
            <li>
              <NavLink type="burger" isActive={activeLink === 'main'} text="Конструктор"/>
            </li>
            <li>
              <NavLink type="list" isActive={activeLink === 'orders'} text="Лента заказов"/>
            </li>
          </ul>
        </nav>

        <div className={styles.logo}>
          <Logo />
        </div>

        <NavLink type="profile" isActive={activeLink === 'profile'} text="Личный кабинет"/>
      </div>
    </header>
  )
})

AppHeader.propTypes = {
  activeLink: PropTypes.string.isRequired
}

export default AppHeader;