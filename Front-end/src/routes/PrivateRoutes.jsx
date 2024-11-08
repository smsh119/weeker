import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const PrivateRoutes = () => {
  const { getStorage } = useLocalStorage();
  const username = getStorage("name");
  return (
    <>
      {username ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
