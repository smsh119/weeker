const RoutineHeader = ({ styles }) => {
  return (
    <div className={styles.routineHeader}>
      <span></span>
      <ul>
        <li>Monday</li>
        <li>Tuesday</li>
        <li>Wednesday</li>
        <li>Thursday</li>
        <li>Friday</li>
        <li>Saturday</li>
        <li>Sunday</li>
      </ul>
    </div>
  );
};

export default RoutineHeader;