import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationFormSchema } from "../../services/formValidation";
import styles from "../common/css/authPages.module.css";

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(RegistrationFormSchema) });

  function onSubmit(data) {
    // TODO: implement registration functionalities
    console.log(data);
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
            isSubmitting || Object.keys(errors).length > 0 ? true : false
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
