import React, { FC } from 'react';
import styles from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BUN, SAUCE, MAIN } from '../../utils/consts';
import { useAppSelector } from '../../services/hooks';
import { TSetCurrentTab } from '../burger-ingredients/burger-ingredients';

interface ITabs {
  setCurrentTab: TSetCurrentTab;
}

const Tabs: FC<ITabs> = ({ setCurrentTab }) => {
  const { currentTab } = useAppSelector( (state) => state.menu);

  const onTabClick = (tabName: string) => {
    const section = document.querySelector(`[data-ingredient-type = ${tabName}]`);
    if (!section) return;
    section.scrollIntoView(({ behavior: 'smooth' }));
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

export default Tabs;