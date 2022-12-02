import React from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'
import NavLink from '../nav-link/nav-link';

class AppHeader extends React.Component {
  render () {
    return (
      <header className={styles.header}>
        <div className={`${styles.container} pt-4 pb-4 `}>
          <nav>
            <ul className={styles.nav__list}>
              <li>
                <NavLink type="burger" isActive={true} text="Конструктор"/>
              </li>
              <li>
                <NavLink type="list" isActive={false} text="Лента заказов"/>
              </li>
            </ul>
          </nav>

          <div className={styles.logo}>
            <Logo />
          </div>

          <NavLink type="profile" isActive={false} text="Личный кабинет"/>
        </div>
      </header>
    )
  }
}

export default AppHeader;