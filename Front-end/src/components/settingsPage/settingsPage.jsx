import styles from "./settingsPage.module.css";

const SettingsPage = () => {
  return (
    <div>
      <h2 className={styles.settingsHeading}>Settings</h2>
      <div className={styles.container}>
        <form className={styles.settingsForm}>
          <label htmlFor="startHour">
            <span>Start Hour</span>
            <select id="startHour" name="startHour" defaultValue={4}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </label>

          <label htmlFor="startingDay">
            <span>Starting Day</span>
            <select id="startingDay" name="startingDay" defaultValue={4}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
