import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../../services/formValidation";
import styles from "../common/css/authPages.module.css";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(LoginFormSchema) });

  function onSubmit(data) {
    // TODO: implement login functionalities
    console.log(data);
  }

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Weeker!</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          type="email"
          name="email"
          placeholder="Email"
          className={errors?.email ? "inputErrorBorder" : ""}
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
          <p>{`Don't have an account?`}</p>
          <Link to="/register">Register now</Link>
        </div>
        <button
          disabled={
            isSubmitting || Object.keys(errors).length > 0 ? true : false
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
