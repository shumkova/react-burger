import React, { forwardRef } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlay {
  onClick: () => void;
}

const ModalOverlay = forwardRef<HTMLDivElement, IModalOverlay>(({ onClick }, ref) => {
  return (
    <div className={styles.overlay} ref={ref} onClick={onClick}></div>
  )
})

export default ModalOverlay;