import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import close_image from '../../images/close.svg';
import { useDispatch } from "react-redux";
import { closeModal } from "../../services//modal"

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children }) => {

  const modal = useRef();
  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeModal());
  }

  const overlayClosePopup = (e) => {
    if (modal.current && !modal.current.contains(e.target)) {
      close();
    }
    return;
  }

  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      close()
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
        <ModalOverlay />
        <div className={styles.modal} ref={modal}>
          {children}
          <button className={styles.button_close} onClick={() => close()}>
            <img src={close_image} alt="Закрыть модальное окно" />
          </button>
        </div>
      </div>
    ),
    modalRoot
  );
}

export default Modal