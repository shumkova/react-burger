import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = React.forwardRef((props, ref) => {
  return (
    <div className={styles.overlay} ref={ref} onClick={props.onClick}></div>
  )
})

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default ModalOverlay;