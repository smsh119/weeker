import { useState } from "react";
import { NavLink } from "react-router-dom";
import Bars from "../../assets/bars-solid.svg";
import CloseButtonX from "./CloseButtonX";
import styles from "./css/navbar.module.css";

const Navbar = () => {
  const [navVisibleClass, setNavVisibleClass] = useState(styles.hideNav);

  function hideNav() {
    setNavVisibleClass(styles.hideNav);
  }
  function showNav() {
    setNavVisibleClass(styles.showNav);
  }

  return (
    <>
      <div className="container" onClick={showNav}>
        <img src={Bars} className={styles.navBtn} />
      </div>

      <div
        className={`${styles.overlay} ${
          navVisibleClass === styles.showNav
            ? styles.overlayVisible
            : styles.overlayHidden
        }`}
        onClick={hideNav}
      />

      <nav className={`${styles.nav} ${navVisibleClass}`}>
        <CloseButtonX onClose={hideNav} />
        <ul>
          <li>
            <NavLink
              to="/routine"
              className={({ isActive }) => (isActive ? styles.navActive : "")}
              onClick={hideNav}
            >
              Routine
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? styles.navActive : "")}
              onClick={hideNav}
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) => (isActive ? styles.navActive : "")}
              onClick={hideNav}
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
