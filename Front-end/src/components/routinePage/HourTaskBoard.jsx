import { zodResolver } from "@hookform/resolvers/zod";
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
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      taskColor: "#f7b131",
    },
    resolver: zodResolver(AddTaskSchema),
  });

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
      <h3 className={styles.timeRange}>{time}</h3>
      <div className={styles.tasks}>
        {/* Items */}
        {tasks?.length > 0 ? (
          tasks?.map((task, indx) => (
            <div
              className={styles.task}
              key={indx}
              style={{ backgroundColor: task.color }}
            >
              <p>{task?.description}</p>
              <button onClick={() => handleDelete(task._id)}>delete</button>
            </div>
          ))
        ) : (
          <div>
            <p className={styles.noTask}>Time to add a new task!</p>
          </div>
        )}

        {/* task input */}
        {showTaskInput && (
          <form
            className={`${styles.task} ${styles.taskInputDiv}`}
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
              <input {...register("taskColor")} type="color" name="taskColor" />
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
          </form>
        )}

        {/* add task div */}
        {!showTaskInput && (
          <button
            className={styles.addTaskDiv}
            onClick={() => setShowTaskInput(true)}
          >
            <span>+</span> Add Task
          </button>
        )}
      </div>
    </div>
  );
};

export default HourTaskBoard;
