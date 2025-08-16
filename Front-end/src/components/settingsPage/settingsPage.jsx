import { Controller, useForm } from "react-hook-form";
import { getHours } from "../../utils/formatHour.js";
import { getWeekDays } from "../../utils/weekDays.js";
import Select from "../common/Select.jsx";
import styles from "./settingsPage.module.css";

const SettingsPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2 className={styles.settingsHeading}>Settings</h2>
      <div className={styles.container}>
        <form className={styles.settingsForm} onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Start Hour</span>
            <Controller
              name="startHour"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  options={getHours(0)}
                />
              )}
            />
          </label>

          <label>
            <span>Starting Day</span>
            <Controller
              name="startingDay"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  options={getWeekDays()}
                />
              )}
            />
          </label>
          <button disabled={isSubmitting ? true : false} type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
