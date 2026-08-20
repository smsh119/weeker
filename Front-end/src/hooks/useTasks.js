import { useEffect, useState } from "react";
import { toast } from "sonner";
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
        (task) => task?._id !== taskId,
      );
      tasksInDay[time] = tasksInTime;
      newTasks[day] = tasksInDay;
      setTasks(newTasks);
    } else {
      toast.error(
        "Unexpected error occured! Task could not be deleted. Please try again.",
      );
      console.log("Sorry! Unexpected error occured!");
    }
  };
  const addTask = async (day, time, task) => {
    try {
      const res = await http.post(`/tasks`, { day, time, task });
      const newlyAddedTask = res.data;
      if (res.status === 201) {
        const newTasks = { ...tasks };
        const tasksInDay = { ...newTasks[day] };
        const tasksInTime =
          tasksInDay[time]?.length > 0
            ? [...tasksInDay[time], newlyAddedTask]
            : [newlyAddedTask];
        tasksInDay[time] = tasksInTime;
        newTasks[day] = tasksInDay;
        setTasks(newTasks);
      } else {
        toast.error(
          "Unexpected error occured! Task could not be added. Please try again.",
        );
        console.error(`Status returned: ${res.status} - Could not add task`);
      }
    } catch (err) {
      toast.error(
        "Unexpected error occured! Task could not be added. Please try again.",
      );
      console.error("An error occured on catch in useTasks -> addTask", err);
    }
  };

  return { tasks, loading, deleteTask, addTask };
};

export default useTasks;
