import { useEffect, useRef } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import close_image from '../../images/close.svg';
import type { TModalProps } from "../../types/types";

const Modal = ({ children, onClose }: TModalProps) => {

  const modal = useRef<HTMLDivElement>(null);

  const close = () => {
    onClose()
  }

  const overlayClosePopup = (e: MouseEvent) => {
    if (e.target instanceof Node && modal.current && !modal.current.contains(e.target)) {
      close()
    }    
  }

  const handleEscClose = (e: KeyboardEvent) => {
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
  });

  return (
    <div className={styles.modal_container}>
      <ModalOverlay />
      <div className={styles.modal} ref={modal}>
        {children}
        <button className={styles.button_close} onClick={() => close()}>
          <img src={close_image} alt="Закрыть модальное окно" />
        </button>
      </div>
    </div>
  )
}

export default Modal