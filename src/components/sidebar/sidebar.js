import styles from './sidebar.module.css';
import {Link, useNavigate} from 'react-router-dom';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { APP_SECTION, PROFILE_SECTION } from '../../utils/consts';
import { SWITCH_APP_SECTION, SWITCH_PROFILE_SECTION } from '../../services/actions/app';
import { signOut } from "../../services/actions/auth";

const Sidebar = () => {
  const { activeProfileSection } = useSelector(state => state.app);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeActiveSection = (section) => {
    dispatch({
      type: SWITCH_PROFILE_SECTION,
      section
    })
  }

  const logOut = useCallback(() => {
    dispatch(signOut());

    if (!user) {
      navigate('/');
      dispatch({
        type: SWITCH_APP_SECTION,
        section: APP_SECTION.MAIN
      })
    }

  }, [dispatch, navigate, user])

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link
            to={'/profile'}
            onClick={() => changeActiveSection(PROFILE_SECTION.INDEX)}
            className={`text text_type_main-medium ${styles.link} ${activeProfileSection === PROFILE_SECTION.INDEX ? styles.link_active : ''}`}
          >
            Профиль
          </Link>
        </li>
        <li>
          <Link
            to={'/profile/orders'}
            onClick={() => changeActiveSection(PROFILE_SECTION.ORDERS)}
            className={`text text_type_main-medium ${styles.link} ${activeProfileSection === PROFILE_SECTION.ORDERS ? styles.link_active : ''}`}
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

export default Sidebar;