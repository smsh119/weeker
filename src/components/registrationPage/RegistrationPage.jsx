import { Link } from "react-router-dom";
import styles from "../common/css/authPages.module.css";

const RegistrationPage = () => {
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: implement registration functionalities
    alert("form submitted");
  }

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Weeker!</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="fullname" placeholder="Full Name" />
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
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
