import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import useLocalStorage from "../../hooks/useLocalStorage";
import http from "../../services/httpServices.js";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getStorage, setStorage } = useLocalStorage();

  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const target = getStorage("name") ? "/routine" : "/login";

  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid verification link!");
      navigate(target);
      return;
    }

    (async () => {
      const res = await http.post("/auth/verify-email", { token, email });
      if (res?.errors?.length > 0) {
        toast.error(res.errors[0]);
      } else if (res?.status === 200) {
        setStorage("isVerified", true);
        toast.success("Email verified successfully!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      navigate(target);
    })();
  }, [token, email, target, navigate, setStorage]);

  return null;
};

export default VerifyEmailPage;
