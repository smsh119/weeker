import { useEffect, useState } from "react";
import { toast } from "sonner";
import useLocalStorage from "../../hooks/useLocalStorage";
import http from "../../services/httpServices.js";
import styles from "./routinePage.module.css";

const VerifyBanner = () => {
  const { getStorage } = useLocalStorage();
  const email = getStorage("email");
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function handleResend() {
    setSending(true);
    const res = await http.post("/auth/resend-verification", { email });
    if (res?.status === 200) {
      toast.success("Verification email sent!");
      setCooldown(60);
    } else {
      toast.error(res?.errors?.[0] || "Failed to send email.");
    }
    setSending(false);
  }

  return (
    <div className={styles.verifyBanner}>
      <p>
        A verification email has been sent to your email. Please verify your email to edit your routine.
      </p>
      <div>
        {cooldown > 0 ? (
          <span className={styles.verifyBannerCooldown}>
            Resend in {cooldown}s
          </span>
        ) : (
          <button
            className={styles.verifyBannerLink}
            onClick={handleResend}
            disabled={sending}
          >
            {sending ? "Sending..." : "Resend verification email"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyBanner;
