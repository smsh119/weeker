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
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: ["Internal server error!"] });
  }
};

const getTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const taskCollection = await TaskCollection.findOne({ userId });

    const resData = {
      userId: taskCollection.userId.toString(),
      saturday: taskCollection?.saturday
        ? Object.fromEntries(taskCollection.saturday)
        : {},
      sunday: taskCollection?.sunday
        ? Object.fromEntries(taskCollection.sunday)
        : {},
      monday: taskCollection?.monday
        ? Object.fromEntries(taskCollection.monday)
        : {},
      tuesday: taskCollection?.tuesday
        ? Object.fromEntries(taskCollection.tuesday)
        : {},
      wednesday: taskCollection?.wednesday
        ? Object.fromEntries(taskCollection.wednesday)
        : {},
      thursday: taskCollection?.thursday
        ? Object.fromEntries(taskCollection.thursday)
        : {},
      friday: taskCollection?.friday
        ? Object.fromEntries(taskCollection.friday)
        : {},
    };

    res.status(200).json(resData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: ["Internal server error!"] });
  }
};

module.exports = {
  addTask,
  getTasks,
  __for_Testing_to_Add_All_taskCollection,
};
