import { useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import styles from "./css/header.module.css";
import Navbar from "./Navbar";

const Header = () => {
  const { pathname } = useLocation();
  const { getStorage } = useLocalStorage();
  const name = getStorage("name");
  let showNavBar = true;
  if (pathname === "/login" || pathname === "/register") showNavBar = false;
  return (
    <>
      <div className={`container ${styles.brandingDiv}`}>
        <h1 className={`${styles.brandingText}`}>Weeker!</h1>
        {name && <p className={`${styles.usernameText}`}>Hello {name}!</p>}
      </div>

      <div className={`${styles.blackStrip}`}>{showNavBar && <Navbar />}</div>
    </>
  );
};

export default Header;
