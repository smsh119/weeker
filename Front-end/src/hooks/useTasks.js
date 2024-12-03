import { useEffect, useState } from "react";
import http from "../services/httpServices.js";

// TODO: fix error handling for accessing routine page without cookie
const useTasks = () => {
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await http.get("/tasks");
        setTasks(data.data);
      } catch (err) {
        console.log("error occured in useTasks");
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  // console.log(tasks);
  const deleteTask = async (day, time, taskId) => {
    const res = await http.del(`/tasks?day=${day}&time=${time}&id=${taskId}`);
    if (res.status === 200) {
      const newTasks = { ...tasks };
      const tasksInDay = { ...newTasks[day] };
      const tasksInTime = tasksInDay[time]?.filter(
        (task) => task?._id !== taskId
      );
      tasksInDay[time] = tasksInTime;
      newTasks[day] = tasksInDay;
      setTasks(newTasks);
    } else {
      // TODO: add a toast notification for this error
      console.log("Sorry! Unexpected error occured!");
    }
  };

  return { tasks, loading, deleteTask };
};

export default useTasks;
