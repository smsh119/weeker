const TaskCollection = require("../models/taskCollection.js");

const __for_Testing_to_Add_All_taskCollection = async (req, res) => {
  const data = req.body;

  const taskCollection = new TaskCollection(data);
  taskCollection
    .save()
    .then(() => console.log("saved successfully"))
    .catch(() => console.log("Could not save"));

  res.status(201).json({ status: "Success" });
  // console.log(data);
};

const addTask = async (req, res) => {
  const user = req.user;
  const data = req.body;
  const tasks = await TaskCollection.findOne({ userId: user.id });
  if (!tasks[data.day]) {
    tasks[data.day] = new Map();
    tasks[data.day].set(data.time, [data.task]);
  } else {
    let tasksAtTime = tasks[data.day].get(data.time);
    if (!tasksAtTime) {
      tasks[data.day].set(data.time, [data.task]);
    } else {
      tasks[data.day].set(data.time, [...tasksAtTime, data.task]);
    }
  }
  await TaskCollection(tasks).save();

  res.status(201).json();
};

const getTasks = async (req, res) => {};

module.exports = {
  addTask,
  __for_Testing_to_Add_All_taskCollection,
};
