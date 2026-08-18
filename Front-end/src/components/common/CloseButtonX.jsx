import CloseIcon from "../../assets/circle-xmark-solid.svg";
import styles from "./css/closeButtonX.module.css";

const CloseButtonX = ({ onClose }) => {
  return (
    <div className={styles.closeBtn} onClick={onClose}>
      <img src={CloseIcon} width="30px" alt="Close Button" />
    </div>
  );
}

export default CloseButtonX;