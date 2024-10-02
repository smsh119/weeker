import { useState } from "react";
import { data } from "../../services/dummyData";
import formatHour from "../../utils/formatHour";
import Modal from "../common/Modal";
import HourTaskBoard from "./HourTaskBoard";
import RoutineHeader from "./RoutineHeader";
import styles from "./routinePage.module.css";

const routine = () => {
  // states
  const [showHourTaskBoard, setShowHourTaskBoard] = useState(false);

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
      {/* TODO: finish modal styling and functionality */}
      {showHourTaskBoard && (
        <Modal onClose={() => setShowHourTaskBoard(false)}>
          <HourTaskBoard />
        </Modal>
      )}
      <RoutineHeader styles={styles} />

      <div className={styles.routineSection}>
        <div className={styles.timeColumn}>
          {hours.map((hour, indx) => (
            <div key={indx}>{hour}</div>
          ))}
        </div>
        <div className={styles.gridColumn}>
          {allTasks?.map((tasks, indx) => (
            <div key={indx} className={styles.column}>
              {/* tasks in columns */}
              {tasks?.map((tasksInSegment, indx) => (
                <div key={indx} className={styles.segment}>
                  {/* task count in segment*/}
                  {tasksInSegment.length > 0 ? (
                    <span className={styles.taskCount}>
                      {tasksInSegment.length}
                    </span>
                  ) : null}
                  <div
                    className={styles.tasks}
                    onClick={() => setShowHourTaskBoard(true)}
                  >
                    {/* tasks in segment */}
                    {tasksInSegment?.map((singleTask, indx) => (
                      <p key={indx} className={styles.task}>
                        {singleTask}
                      </p>
                    ))}
                  </div>
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
