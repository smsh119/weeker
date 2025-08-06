import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddTaskSchema } from "../../services/formValidation";
import styles from "./hourTaskBoard.module.css";

const HourTaskBoard = ({ tasks, time, day, onDelete, onAddTask }) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      taskColor: "#f7b131",
    },
    resolver: zodResolver(AddTaskSchema),
  });

  const taskInputBGColor = watch("taskColor");

  function handleDelete(taskId) {
    onDelete(day, time, taskId);
  }

  async function onSubmit(data) {
    onAddTask(day, time, {
      color: data?.taskColor,
      description: data?.taskDescription,
    });
    reset();
  }
  return (
    <div className={styles.taskBoardContainer}>
      <h2 className={styles.taskBoardHeader}>Tasks</h2>
      <h3 className={styles.timeRange}>{`${day} - ${time}`}</h3>
      <div className={styles.tasks}>
        {/* Items */}
        <AnimatePresence>
          {tasks?.length > 0 ? (
            tasks?.map((task, indx) => (
              <motion.div
                className={styles.task}
                key={task?._id || indx}
                style={{ backgroundColor: task.color }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <p>{task?.description}</p>
                <button onClick={() => handleDelete(task._id)}>delete</button>
              </motion.div>
            ))
          ) : (
            <div>
              <p className={styles.noTask}>Time to add a new task!</p>
            </div>
          )}
        </AnimatePresence>

        {/* task input */}
        <AnimatePresence>
          {showTaskInput && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${styles.task} ${styles.taskInputDiv}`}
              style={{ backgroundColor: `${taskInputBGColor}` }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("taskDescription")}
                type="text"
                name="taskDescription"
                placeholder={
                  errors?.taskDescription
                    ? errors?.taskDescription?.message
                    : "Task Description"
                }
                className={`${styles.taskInput} ${
                  errors?.taskDescription ? "inputErrorBorder" : ""
                }`}
              />
              <div className={styles.inputButtons}>
                <input
                  {...register("taskColor")}
                  type="color"
                  name="taskColor"
                />
                <button>Save</button>
                <button
                  onClick={() => {
                    reset();
                    setShowTaskInput(false);
                  }}
                >
                  X
                </button>
              </div>
            </motion.form>
          )}

          {/* add task div */}
          {!showTaskInput && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.addTaskDiv}
              onClick={() => setShowTaskInput(true)}
            >
              <span>+</span> Add Task
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HourTaskBoard;
