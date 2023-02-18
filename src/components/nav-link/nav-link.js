import React from 'react';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './nav-link.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RESET_PROFILE_SECTION, SWITCH_APP_SECTION } from '../../services/actions/app';
import { APP_SECTION } from '../../utils/consts';

const NavLink = (props) => {
  const { type, isActive, text, to } = props;
  const dispatch = useDispatch();

  const icons = {
    burger: <BurgerIcon type={isActive ? 'primary' : 'secondary'} />,
    list: <ListIcon type={isActive ? 'primary' : 'secondary'} />,
    profile: <ProfileIcon type={isActive ? 'primary' : 'secondary'} />,
  }

  const clickHandler = (evt) => {
    dispatch({
      type: SWITCH_APP_SECTION,
      section: type
    })

    if (type === APP_SECTION.PROFILE) {
      dispatch({
        type: RESET_PROFILE_SECTION
      })
    }
  }

  return (
    <Link
      to={to}
      className={`${styles.link} ${isActive ? styles.link_active : ''} ${type === APP_SECTION.PROFILE ? styles.link_type_profile : ''} pt-4 pb-4 pl-5 pr-5`}
      onClick={clickHandler}
    >
      {icons[type]}
      <span className="text text_type_main-default">{text}</span>
    </Link>
  )
}

NavLink.propTypes = {
  type: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default NavLink;