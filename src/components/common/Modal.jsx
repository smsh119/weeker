import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./css/modal.module.css";

const Modal = ({ children, onClose, heading }) => {
  const mountElement = document.body;
  const elementDiv = document.createElement("div");

  useEffect(() => {
    mountElement.appendChild(elementDiv);
    return () => {
      mountElement.removeChild(elementDiv);
    };
  }, [mountElement, elementDiv]);

  return createPortal(
    <section
      className={styles.modalContainer}
      aria-modal="true"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          x
        </button>
        {heading && <h2 className={styles.modalHeading}>{heading}</h2>}
        {children}
      </div>
    </section>,
    elementDiv
  );
};

export default Modal;
