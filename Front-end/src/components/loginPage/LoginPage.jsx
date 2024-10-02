import { useState } from "react";
import { Link } from "react-router-dom";
import { validateLogin } from "../../services/formValidation";
import styles from "../common/css/authPages.module.css";

const LoginPage = () => {
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const valid = validateLogin(formData);
    if (valid?.error) {
      setError(valid.error);
    } else {
      // TODO: implement login functionalities
      setError(valid.message);
    }
  }

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Weeker!</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        {error && <div className="formError">{error}</div>}
        <div>
          <p>{`Don't have an account?`}</p>
          <Link to="/register">Register now</Link>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
