import PropTypes from 'prop-types';
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import close_image from '../../images/close.svg';

const modalRoot = document.getElementById("react-modals");

const Modal = ({children, onCloseModal}) => {

  const modal = useRef();

  function overlayClosePopup(e) {
    if (modal.current && !modal.current.contains(e.target)) {
      onCloseModal();
    }
    return;
  }

  function handleEscClose(e) {
    if (e.key === "Escape") {
      onCloseModal();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', overlayClosePopup);
    return () => {
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('click', overlayClosePopup);
    }
  })

  return createPortal(
    (
        <div className={styles.modal_container}>
          <ModalOverlay/>
          <div className={styles.modal} ref={modal}>
            {children}
            <button className={styles.button_close} onClick={onCloseModal}>
              <img src={close_image} alt="Закрыть модальное окно"/>
            </button>
          </div>
        </div>  
    ),
    modalRoot  
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired
};

export default Modal