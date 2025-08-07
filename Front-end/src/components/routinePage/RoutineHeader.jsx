import useLocalStorage from "../../hooks/useLocalStorage";
import { getWeekDays } from "../../utils/weekDays";

const RoutineHeader = ({ styles }) => {
  const { getStorage } = useLocalStorage();
  const startDayIndex = getStorage("startDayIndex") || 0;
  const weekDays = getWeekDays(startDayIndex);
  return (
    <div className={styles.routineHeader}>
      <span></span>
      <ul>
        {weekDays.map((day, index) => (
          <li key={index}>{day}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoutineHeader;
