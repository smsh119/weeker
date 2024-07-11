import Bars from "../../assets/bars-solid.svg";
import styles from "./css/header.module.css";

const Header = () => {
  return (
    <>
      <div className={`container ${styles.brandingDiv}`}>
        <h1 className={`${styles.brandingText}`}>Weeker!</h1>
        {/* <p className={`${styles.usernameText}`}>Hello Mr. X!</p> */}
      </div>

      <div className={`${styles.blackStrip}`}>
        <div className="container">
          <img src={Bars} className={styles.navBtn} />
        </div>
      </div>
    </>
  );
};

export default Header;
