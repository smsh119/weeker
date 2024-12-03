import styles from "./hourTaskBoard.module.css";

const HourTaskBoard = ({ tasks, time, day, onDelete }) => {
  function handleDelete(taskId) {
    onDelete(day, time, taskId);
  }

  return (
    <div className={styles.taskBoardContainer}>
      <h2 className={styles.taskBoardHeader}>Tasks</h2>
      <h3 className={styles.timeRange}>{time}</h3>
      <div className={styles.tasks}>
        {/* Items */}
        {tasks?.length > 0 ? (
          tasks?.map((task, indx) => (
            <div className={styles.task} key={indx}>
              <p>{task?.description}</p>
              <button onClick={() => handleDelete(task._id)}>delete</button>
            </div>
          ))
        ) : (
          <div>
            <p className={styles.noTask}>Time to add a new task!</p>
          </div>
        )}

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
