import { useEffect, useState } from "react";
import http from "../services/httpServices.js";

const useTasks = () => {
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await http.get("/tasks");
        if (data?.error?.length > 0) {
          setTasks(data);
        } else {
          setTasks(data.data);
        }
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
  //TODO: get the task as response of add task to add it to the state to fix delete issue after adding on backend
  const addTask = async (day, time, task) => {
    try {
      const res = await http.post(`/tasks`, { day, time, task });
      //TODO: check http services and fix error handling
      if (res.status === 201) {
        const newTasks = { ...tasks };
        const tasksInDay = { ...newTasks[day] };
        const tasksInTime =
          tasksInDay[time]?.length > 0 ? [...tasksInDay[time], task] : [task];
        tasksInDay[time] = tasksInTime;
        newTasks[day] = tasksInDay;
        setTasks(newTasks);
      } else {
        // TODO: add a toast notification for this error
        console.log("Sorry! Could not add the task.");
      }
    } catch (err) {
      //TODO: add a toast
      console.log("An error occured on catch in useTasks->addTask");
      console.log(err);
    }
  };

  return { tasks, loading, deleteTask, addTask };
};

export default useTasks;
