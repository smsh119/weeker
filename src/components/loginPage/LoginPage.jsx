import { Link } from "react-router-dom";
import styles from "../common/css/authPages.module.css";

const LoginPage = () => {
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: implement login functionalities
    alert("form submitted");
  }

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Weeker!</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
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
