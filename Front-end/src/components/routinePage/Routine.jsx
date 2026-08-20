import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useLocalStorage from "../../hooks/useLocalStorage";
import useTasks from "../../hooks/useTasks";
import { getHours } from "../../utils/formatHour";
import { getWeekDays } from "../../utils/weekDays";
import Modal from "../common/Modal";
import HourTaskBoard from "./HourTaskBoard";
import RoutineHeader from "./RoutineHeader";
import VerifyBanner from "./VerifyBanner";
import styles from "./routinePage.module.css";

const Routine = () => {
  // hooks
  const [hourTaskBoardVisible, setHourTaskBoardVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState({ day: "", time: "" });
  const navigate = useNavigate();
  const { tasks, loading, deleteTask, addTask } = useTasks();
  const { clearStorage, getStorage } = useLocalStorage();

  const startDayIndex = getStorage("startDayIndex") || 0;
  const startHour = getStorage("startHour") || 6;
  const days = getWeekDays(startDayIndex);
  const hours = getHours(startHour);
  const isVerified = getStorage("isVerified");

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
      toast.error("Unexpected error occured! Please try again.");
      console.error("Error occured: ", tasks.error[0]);
    }
  }
  return (
    <div className="container">
      {hourTaskBoardVisible && (
        <Modal onClose={hideHourTaskBoard}>
          <HourTaskBoard
            tasks={tasks[modalOptions.day][modalOptions.time]}
            time={modalOptions.time}
            day={modalOptions.day}
            onDelete={deleteTask}
            onAddTask={addTask}
          />
        </Modal>
      )}
      <RoutineHeader styles={styles} />
      {!isVerified && <VerifyBanner />}

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
                    className={`${styles.tasks} ${!isVerified ? styles.segmentLocked : ""}`}
                    onClick={isVerified ? () => showHourTaskBoard(day, hour) : undefined}
                  >
                    {/* tasks in segment */}
                    {tasks[day][hour]?.map((singleTask, indx) => (
                      <p
                        key={indx}
                        style={{ backgroundColor: singleTask.color }}
                        className={styles.task}
                      >
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

export default Routine;
