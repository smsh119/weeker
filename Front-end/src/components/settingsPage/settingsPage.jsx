import { getHours } from "../../utils/formatHour.js";
import { getWeekDays } from "../../utils/weekDays.js";
import Select from "../common/Select.jsx";
import styles from "./settingsPage.module.css";

const SettingsPage = () => {
  return (
    <div>
      <h2 className={styles.settingsHeading}>Settings</h2>
      <div className={styles.container}>
        <form className={styles.settingsForm}>
          <label htmlFor="startHour">
            <span>Start Hour</span>
            <Select name="startHour" options={getHours(0)} />
          </label>

          <label htmlFor="startingDay">
            <span>Starting Day</span>
            <Select name="startingDay" options={getWeekDays()} />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
