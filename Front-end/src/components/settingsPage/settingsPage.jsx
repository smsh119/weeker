import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import http from "../../services/httpServices.js";
import { formatHour, getHours } from "../../utils/formatHour.js";
import { getWeekDay, getWeekDays } from "../../utils/weekDays.js";
import Select from "../common/Select.jsx";
import styles from "./settingsPage.module.css";

const SettingsPage = () => {
  const { setStorage, getStorage } = useLocalStorage();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      startHour:
        getStorage("startHour") >= 0
          ? formatHour(getStorage("startHour"))
          : undefined,
      startDayIndex:
        getStorage("startDayIndex") >= 0
          ? getWeekDay(getStorage("startDayIndex"))
          : undefined,
    },
  });

  const hours = getHours(0);
  const days = getWeekDays();

  async function onSubmit(data) {
    const payload = {
      startHour: hours.indexOf(data.startHour),
      startDayIndex: days.indexOf(data.startDayIndex),
    };
    const res = await http.patch("/settings/update", payload);
    if (res?.errors?.length > 0) {
      toast.error("Unexpected error occured! Please try again.");
      console.log("Error in settings submission: ", res.errors);
      return;
    }
    if (res?.status === 200) {
      setStorage("startHour", res.data.startHour);
      setStorage("startDayIndex", res.data.startDayIndex);
      toast.success("Settings updated successfully!");
    }
  }

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
                  options={hours}
                />
              )}
            />
          </label>

          <label>
            <span>Starting Day</span>
            <Controller
              name="startDayIndex"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  options={days}
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
