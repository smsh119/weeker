import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import usePageMeta from "../../hooks/usePageMeta";
import { ForgotPasswordSchema } from "../../services/formValidation";
import http from "../../services/httpServices.js";
import styles from "../common/css/authPages.module.css";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  usePageMeta({ title: "Reset Your Password", noindex: true });
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(ForgotPasswordSchema) });

  async function onSubmit(data) {
    const res = await http.post("/auth/forgot-password", data);
    if (res?.errors?.length > 0) {
      setError("root", { type: "manual", message: res.errors[0] });
      return;
    }
    if (res?.status === 200) {
      toast.success(res.data.message);
      navigate(`/login?email=${encodeURIComponent(data.email)}`);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          onChange: () =>
            (errors?.email || errors?.root) && clearErrors(["root", "email"]),
        })}
        type="email"
        name="email"
        placeholder="Email"
        className={errors?.email ? "inputErrorBorder" : ""}
      />
      {errors?.email && (
        <div className="formError">{errors.email.message}</div>
      )}
      {errors?.root && <div className="formError">{errors.root.message}</div>}
      <div>
        <Link to="/login">Back to login</Link>
      </div>
      <button
        disabled={isSubmitting || errors?.email || errors?.root ? true : false}
        type="submit"
      >
        Send Reset Link
      </button>
    </form>
  );
};

export default ForgotPasswordPage;
