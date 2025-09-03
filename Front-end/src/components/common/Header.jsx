import { useLocation } from "react-router-dom";
import UserIcon from "../../assets/user-icon.svg";
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
        {name && (
          <div>
            <img
              src={UserIcon}
              alt="User Icon"
              className={`${styles.userIcon}`}
            />
            <span className={`${styles.usernameText}`}>{name}</span>
          </div>
        )}
      </div>

      <div className={`${styles.blackStrip}`}>{showNavBar && <Navbar />}</div>
    </>
  );
};

export default Header;
