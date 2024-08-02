import styles from "./css/header.module.css";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <div className={`container ${styles.brandingDiv}`}>
        <h1 className={`${styles.brandingText}`}>Weeker!</h1>
        {/* <p className={`${styles.usernameText}`}>Hello Mr. X!</p> */}
      </div>

      <div className={`${styles.blackStrip}`}>
        <Navbar />
      </div>
    </>
  );
};

export default Header;
