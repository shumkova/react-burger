import React from 'react';
import styles from '../burger-ingredients/burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Tabs = ({onTabClick, currentTab}) => {
  return (
    <div className={`${styles.tabs} mb-10`}>
      <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
        Булки
      </Tab>
      <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
        Соусы
      </Tab>
      <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>
        Начинки
      </Tab>
    </div>
  )
}

Tabs.propTypes = {
  onTabClick: PropTypes.func,
  currentTab: PropTypes.string
};

export default Tabs;