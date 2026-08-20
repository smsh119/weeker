import { Navigate, Outlet } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";
import WelcomePanel from "../components/common/WelcomePanel";
import styles from "../components/common/css/authPages.module.css";

const AuthRoutes = () => {
  const { getStorage } = useLocalStorage();
  const username = getStorage("name");
  return username ? (
    <Navigate to="/routine" />
  ) : (
    <div className={styles.authLayout}>
      <WelcomePanel />
      <div className={styles.divider} />
      <div className={styles.formPanel}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthRoutes;
