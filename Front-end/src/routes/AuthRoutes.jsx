import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthRoutes = () => {
  const { getStorage } = useLocalStorage();
  const username = getStorage("name");
  return (
    <>
      {username ? (
        <>
          <Navigate to="/routine" />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default AuthRoutes;
