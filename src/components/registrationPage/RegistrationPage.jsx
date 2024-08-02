import { useState } from "react";
import { Link } from "react-router-dom";
import { validateRegistration } from "../../services/formValidation";
import styles from "../common/css/authPages.module.css";

const RegistrationPage = () => {
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const valid = validateRegistration(formData);
    if (valid?.error) {
      setError(valid.error);
    } else {
      // TODO: implement registration functionalities
      setError(valid.message);
    }
  }

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Weeker!</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="fullname" placeholder="Full Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        {error && <div className="formError">{error}</div>}
        <div>
          <p>{`Already have an account?`}</p>
          <Link to="/login">Log in</Link>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
