import React from 'react';
import * as ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.querySelector('#react-modals');

const Modal = (props) => {
  const {title, onCLose} = props;
  const modalEl = React.useRef();
  const overlayEl = React.useRef();

  const closeModal = () => {
    modalEl.current.classList.remove(modalStyles.modal_open);
    modalEl.current.classList.add(modalStyles.modal_close);

    setTimeout(onCLose, 300);
  }

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  }

  React.useEffect(() => {
      modalEl.current.classList.add(modalStyles.modal_open);
      modalEl.current.classList.remove(modalStyles.modal_close);

      document.addEventListener('keydown', onEscPress);

      return () => {
        document.removeEventListener('keydown', onEscPress);
      };
  }, []);

  return ReactDOM.createPortal(
    (
      <div className={`${modalStyles.modal}`} ref={modalEl}>
        <div className={modalStyles.content}>
          <div className={modalStyles.header}>
            {title && <h2 className={`${modalStyles.title} text text_type_main-large`}>{title}</h2>}
            <button className={modalStyles.close} type="button" aria-label="Закрыть модальное окно" onClick={closeModal}>
              <CloseIcon type="primary" />
            </button>
          </div>

          {props.children}
        </div>
        <ModalOverlay onClick={closeModal} ref={overlayEl}/>
      </div>
    ),
    modalRoot
  )
}

export default Modal;