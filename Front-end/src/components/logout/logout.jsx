import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import http from "../../services/httpServices";

const Logout = () => {
  const { clearStorage } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await http.del("/auth/logout");
      if (res?.status === 200) {
        clearStorage();
        navigate("/login");
      }
    })();
  }, []);

  return null;
};

export default Logout;
