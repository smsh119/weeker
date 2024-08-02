import { useState } from "react";
import { NavLink } from "react-router-dom";
import Bars from "../../assets/bars-solid.svg";
import CloseIcon from "../../assets/circle-xmark-solid.svg";
import styles from "./css/navbar.module.css";

const Navbar = () => {
  const [navVisibleClass, setNavVisibleClass] = useState(styles.hideNav);

  return (
    <>
      <div
        className="container"
        onClick={() => setNavVisibleClass(styles.showNav)}
      >
        <img src={Bars} className={styles.navBtn} />
      </div>

      <nav className={`${styles.nav} ${navVisibleClass}`}>
        <div
          className={styles.closeBtn}
          onClick={() => setNavVisibleClass(styles.hideNav)}
        >
          <img src={CloseIcon} width="30px" alt="Close Button" />
        </div>
        <ul>
          <li>
            <NavLink
              to="/routine"
              className={({ isActive }) => (isActive ? styles.navActive : "")}
            >
              Routine
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? styles.navActive : "")}
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) => (isActive ? styles.navActive : "")}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
