import React from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay = React.forwardRef((props, ref) => {
  return (
    <div className={styles.overlay} ref={ref} onClick={props.onClick}></div>
  )
})

export default ModalOverlay;