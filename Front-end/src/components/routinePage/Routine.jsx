import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import useTasks from "../../hooks/useTasks";
import formatHour from "../../utils/formatHour";
import Modal from "../common/Modal";
import HourTaskBoard from "./HourTaskBoard";
import RoutineHeader from "./RoutineHeader";
import styles from "./routinePage.module.css";

const routine = () => {
  // hooks
  const [hourTaskBoardVisible, setHourTaskBoardVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState({ day: "", time: "" });
  const navigate = useNavigate();
  const { tasks, loading, deleteTask } = useTasks();
  const { clearStorage } = useLocalStorage();

  // TODO: make start hour and start day dynamic
  const days = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];
  const hours = [];
  const startHour = 7;
  for (let i = 1; i < 25; i++) {
    hours.push(formatHour(i + startHour - 1));
  }

  function showHourTaskBoard(day, hour) {
    setHourTaskBoardVisible(true);
    setModalOptions({ day: day, time: hour });
  }

  function hideHourTaskBoard() {
    setHourTaskBoardVisible(false);
    setModalOptions({ day: "", time: "" });
  }

  if (loading) return null;
  if (tasks?.error?.length > 0) {
    if (tasks.error[0].status === 401) {
      clearStorage();
      navigate("/login");
      return null;
    } else {
      // TODO: handle error in UI. Show some error messages.
      console.log("Error occured!");
    }
  }
  return (
    <div className="container">
      {/* TODO: finish modal styling and functionality */}
      {hourTaskBoardVisible && (
        <Modal onClose={hideHourTaskBoard}>
          <HourTaskBoard
            tasks={tasks[modalOptions.day][modalOptions.time]}
            time={modalOptions.time}
            day={modalOptions.day}
            onDelete={deleteTask}
          />
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
          {days?.map((day, indx) => (
            <div key={indx} className={styles.column}>
              {/* tasks in columns */}
              {hours?.map((hour, indx) => (
                <div key={indx} className={styles.segment}>
                  {/* task count in segment*/}
                  {tasks[day][hour]?.length > 0 ? (
                    <span className={styles.taskCount}>
                      {tasks[day][hour]?.length}
                    </span>
                  ) : null}
                  <div
                    className={styles.tasks}
                    onClick={() => showHourTaskBoard(day, hour)}
                  >
                    {/* tasks in segment */}
                    {tasks[day][hour]?.map((singleTask, indx) => (
                      <p key={indx} className={styles.task}>
                        {singleTask?.description}
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
