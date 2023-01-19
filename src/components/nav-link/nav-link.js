import React from 'react';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './nav-link.module.css';
import PropTypes from 'prop-types';

const NavLink = (props) => {
  const {type, isActive, text} = props;

  const icons = {
    burger: <BurgerIcon type={isActive ? 'primary' : 'secondary'} />,
    list: <ListIcon type={isActive ? 'primary' : 'secondary'} />,
    profile: <ProfileIcon type={isActive ? 'primary' : 'secondary'} />,
  }

  return (
    <button type={"button"} className={`${styles.link} ${isActive ? styles.link_active : ''} ${type === 'profile' ? styles.link_type_profile : ''} pt-4 pb-4 pl-5 pr-5`}>
      {icons[type]}
      <span className="text text_type_main-default">{text}</span>
    </button>
  )
}

NavLink.propTypes = {
  type: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default NavLink;