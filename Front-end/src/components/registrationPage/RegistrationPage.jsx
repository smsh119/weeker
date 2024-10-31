import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationFormSchema } from "../../services/formValidation";
import http from "../../services/httpServices.js";
import styles from "../common/css/authPages.module.css";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(RegistrationFormSchema) });

  async function onSubmit(data) {
    // TODO: implement registration functionalities
    const res = await http.post("/auth/register", data);
    if (res?.errors?.length > 0) {
      setError("root", { type: "manual", message: res.errors[0] });
      return;
    }
    if (res?.status === 201) {
      navigate(`/login?email=${getValues("email")}`);
    }
  }
  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Weeker!</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("fullname")}
          type="text"
          name="fullname"
          placeholder="Full Name"
          className={errors?.fullname ? "inputErrorBorder" : ""}
        />
        {errors?.fullname && (
          <div className="formError">{errors.fullname.message}</div>
        )}
        <input
          {...register("email")}
          type="email"
          name="email"
          placeholder="Email"
          className={errors?.email ? "inputErrorBorder" : ""}
          onChange={() => errors?.root && clearErrors("root")}
        />
        {errors?.email && (
          <div className="formError">{errors.email.message}</div>
        )}
        <input
          {...register("password")}
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
          <p>{`Already have an account?`}</p>
          <Link to="/login">Log in</Link>
        </div>
        <button
          disabled={
            isSubmitting ||
            errors?.fullname ||
            errors?.email ||
            errors?.password
              ? true
              : false
          }
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
