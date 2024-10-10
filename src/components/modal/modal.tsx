import React, {FC, ReactNode, useCallback, useEffect, useRef} from 'react';
import * as ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { TAnyFunc } from '../../services/types/utils';

interface IModal {
  title?: string;
  onClose: TAnyFunc;
  children?: ReactNode;
}

const modalRoot = document.querySelector('#react-modals');

const Modal: FC<IModal> = (props) => {
  const { title, onClose } = props;
  const modalEl = useRef<HTMLDivElement>(null);
  const overlayEl = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => {
    modalEl.current?.classList.remove(modalStyles.modal_open);
    modalEl.current?.classList.add(modalStyles.modal_close);

    setTimeout(onClose, 300);
  }, [onClose])

  useEffect(() => {
    const onEscPress = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }

    modalEl.current?.classList.add(modalStyles.modal_open);
    modalEl.current?.classList.remove(modalStyles.modal_close);

    document.addEventListener('keydown', onEscPress);

    return () => {
      document.removeEventListener('keydown', onEscPress);
    };
  }, [closeModal]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    (
      <div className={modalStyles.modal} ref={modalEl}>
        <div className={modalStyles.content}>
          <div className={`${modalStyles.header} mb-4`}>
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