import React from 'react';
import styles from './tabs.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BUN, SAUCE, MAIN } from '../../utils/consts';

const Tabs = ({ setCurrentTab }) => {
  const { currentTab } = useSelector( (state) => state.menu);

  const onTabClick = (tabName) => {
    const section = document.querySelector(`[data-ingredient-type = ${tabName}]`);
    section.scrollIntoView(({behavior: 'smooth'}));
    if (currentTab !== tabName) {
      setCurrentTab(tabName);
    }
  }

  return (
    <div className={`${styles.container} mb-10`}>
      <Tab value={BUN} active={currentTab === BUN} onClick={onTabClick}>
        Булки
      </Tab>
      <Tab value={SAUCE} active={currentTab === SAUCE} onClick={onTabClick}>
        Соусы
      </Tab>
      <Tab value={MAIN} active={currentTab === MAIN} onClick={onTabClick}>
        Начинки
      </Tab>
    </div>
  )
}

Tabs.propTypes = {
  setCurrentTab: PropTypes.func.isRequired
}

export default Tabs;