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
        setTasks(data.data);
      } catch (err) {
        console.log("error occured in useTasks");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { tasks, loading };
};

export default useTasks;
