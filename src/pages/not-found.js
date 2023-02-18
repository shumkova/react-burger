import React from "react";
import styles from './not-found.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SWITCH_APP_SECTION } from '../services/actions/app';
import { APP_SECTION } from '../utils/consts';

const NotFoundPage = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch({
      type: SWITCH_APP_SECTION,
      section: APP_SECTION.MAIN
    })
  }

  return (
    <div className={`container ${styles.container}`}>
      <h1 className={'text text_type_main-large mb-6'}>404</h1>
      <p className="text text_type_main-default mb-4">
        Страница, которую вы запросили, отсутствует на нашем сайте.
      </p>
      <p className="text text_type_main-default mb-4">
        Возможно, вы ошиблись при наборе адреса или перешли по неверной ссылке.
      </p>
      <Link to={'/'} replace={true} className={'link'} onClick={onClick}>Перейти на главную</Link>
    </div>
  )
}

export default NotFoundPage;