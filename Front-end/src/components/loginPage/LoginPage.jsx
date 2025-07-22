import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LoginFormSchema } from "../../services/formValidation";
import http from "../../services/httpServices.js";
import styles from "../common/css/authPages.module.css";
const LoginPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setStorage } = useLocalStorage();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: searchParams.get("email") ? searchParams.get("email") : "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  async function onSubmit(data) {
    const res = await http.post("/auth/login", data);
    if (res?.errors?.length > 0) {
      setError("root", { type: "manual", message: res.errors[0] });
      return;
    }
    if (res?.status === 200) {
      setStorage("name", res.data.name);
      setStorage("email", res.data.email);
      navigate(`/routine`);
    }
  }

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Weeker!</h1>
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
        <input
          {...register("password", {
            onChange: () =>
              (errors?.password || errors?.root) &&
              clearErrors(["root", "password"]),
          })}
          type="password"
          name="password"
          placeholder="Password"
          className={errors?.password ? "inputErrorBorder" : ""}
        />
        {errors?.password && (
          <div className="formError">{errors.password.message}</div>
        )}
        {errors?.root && <div className="formError">{errors.root.message}</div>}
        <div>
          <p>{`Don't have an account?`}</p>
          <Link to="/register">Register now</Link>
        </div>
        <button
          disabled={
            isSubmitting || errors?.email || errors?.password || errors?.root
              ? true
              : false
          }
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
