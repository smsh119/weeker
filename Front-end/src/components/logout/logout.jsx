import { useEffect } from "react";
import { useNavigate } from "react-router";
import useLocalStorage from "../../hooks/useLocalStorage";
import usePageMeta from "../../hooks/usePageMeta";
import http from "../../services/httpServices";

const Logout = () => {
  usePageMeta({ noindex: true });
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
  }, [clearStorage, navigate]);

  return null;
};

export default Logout;
