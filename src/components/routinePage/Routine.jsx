import { data } from "../../services/dummyData";
import formatHour from "../../utils/formatHour";
import RoutineHeader from "./RoutineHeader";
import styles from "./routinePage.module.css";
const routine = () => {
  const hours = [];
  const startHour = data.startHour;
  for (let i = 1; i < 25; i++) {
    hours.push(formatHour(i + startHour - 1));
  }
  const allTasks = data?.allTasks?.map((tasksInDay) => {
    const tasksSortedByTime = [];
    for (let i = 0; i < 24; i++) {
      let x = (i + startHour - 1) % 24;
      tasksSortedByTime.push(tasksInDay[x]);
    }
    return tasksSortedByTime;
  });

  return (
    <div className="container">
      <RoutineHeader styles={styles} />

      <div className={styles.routineSection}>
        <div className={styles.timeColumn}>
          {hours.map((hour) => (
            <div>{hour}</div>
          ))}
        </div>
        <div className={styles.gridColumn}>
          {allTasks?.map((tasks) => (
            <div className={styles.column}>
              {tasks?.map((task) => (
                <div className={styles.segment}>
                  {task?.map((singleTask) => (
                    <p className={styles.task}>{singleTask}</p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default routine;
