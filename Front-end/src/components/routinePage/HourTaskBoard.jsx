import styles from "./hourTaskBoard.module.css";

const HourTaskBoard = () => {
  return (
    <div className={styles.taskBoardContainer}>
      <h2 className={styles.taskBoardHeader}>Tasks</h2>
      <h3 className={styles.timeRange}>09:00 to 10:00</h3>
      <div className={styles.tasks}>
        {/* Item */}
        <div className={styles.task}>
          <p>task description</p>
          <button>delete</button>
        </div>
        {/* Item */}
        <div className={styles.task}>
          <p>task description</p>
          <button>delete</button>
        </div>
        {/* Item */}
        <div className={styles.task}>
          <p>task description</p>
          <button>delete</button>
        </div>

        {/* task input */}
        <div className={`${styles.task} ${styles.taskInputDiv}`}>
          <input
            type="text"
            placeholder="Task Description"
            className={styles.taskInput}
          />
          <button>Save</button>
        </div>

        {/* add task div */}
        <div className={styles.addTaskDiv}>
          <span>+</span> Add Task
        </div>
      </div>
    </div>
  );
};

export default HourTaskBoard;
