import styles from "./css/welcomePanel.module.css";

const WelcomePanel = () => {
  return (
    <div className={styles.welcomePanel}>
      <h1 className={styles.logo}>Weeker!</h1>
      <p className={styles.tagline}>Plan your week, own your time</p>
    </div>
  );
};

export default WelcomePanel;
