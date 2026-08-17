import styles from "./routinePage.module.css";

const VerifyBanner = () => {

  return (
    <div className={styles.verifyBanner}>
      <p>
        Your email is not verified. Verify your email to edit your routine.
      </p>
    </div>
  );
};

export default VerifyBanner;
