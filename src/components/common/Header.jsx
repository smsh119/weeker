import { useLocation } from "react-router-dom";
import styles from "./css/header.module.css";
import Navbar from "./Navbar";

const Header = () => {
  const { pathname } = useLocation();
  let showNavBar = true;
  if (pathname === "/login" || pathname === "/register") showNavBar = false;
  return (
    <>
      <div className={`container ${styles.brandingDiv}`}>
        <h1 className={`${styles.brandingText}`}>Weeker!</h1>
        {/* <p className={`${styles.usernameText}`}>Hello Mr. X!</p> */}
      </div>

      <div className={`${styles.blackStrip}`}>{showNavBar && <Navbar />}</div>
    </>
  );
};

export default Header;
