import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { ResetPasswordSchema } from "../../services/formValidation";
import http from "../../services/httpServices.js";
import styles from "../common/css/authPages.module.css";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid reset link!");
      navigate("/login");
    }
  }, [token, email, navigate]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(ResetPasswordSchema) });

  async function onSubmit(data) {
    const res = await http.post("/auth/reset-password", {
      token,
      email,
      newPassword: data.newPassword,
    });
    if (res?.errors?.length > 0) {
      setError("root", { type: "manual", message: res.errors[0] });
      return;
    }
    if (res?.status === 200) {
      toast.success("Password has been reset successfully!");
      navigate(`/login?email=${encodeURIComponent(email)}`);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("newPassword", {
          onChange: () =>
            (errors?.newPassword || errors?.root) &&
            clearErrors(["root", "newPassword"]),
        })}
        type="password"
        name="newPassword"
        placeholder="New password"
        className={errors?.newPassword ? "inputErrorBorder" : ""}
      />
      {errors?.newPassword && (
        <div className="formError">{errors.newPassword.message}</div>
      )}
      <input
        {...register("confirmPassword", {
          onChange: () =>
            (errors?.confirmPassword || errors?.root) &&
            clearErrors(["root", "confirmPassword"]),
        })}
        type="password"
        name="confirmPassword"
        placeholder="Confirm new password"
        className={errors?.confirmPassword ? "inputErrorBorder" : ""}
      />
      {errors?.confirmPassword && (
        <div className="formError">{errors.confirmPassword.message}</div>
      )}
      {errors?.root && <div className="formError">{errors.root.message}</div>}
      <div>
        <Link to="/login">Back to login</Link>
      </div>
      <button
        disabled={
          isSubmitting ||
          errors?.newPassword ||
          errors?.confirmPassword ||
          errors?.root
            ? true
            : false
        }
        type="submit"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordPage;
