const TaskCollection = require("../models/taskCollection.js");

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
    const savedTasks = await TaskCollection(tasks).save();
    const savedTasksAtTime = Object.fromEntries(savedTasks[data.day])[
      data.time
    ];
    savedTasksAtTime.sort((a, b) =>
      b.createdAt.toString().localeCompare(a.createdAt.toString())
    );
    res.status(201).json(savedTasksAtTime[0]);
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

const deleteTask = async (req, res) => {
  const { day, time, id } = req.query;
  if (!day || !time || !id) {
    res.status(400).json({ errors: ["Invalid request!"] });
  }
  const user = req.user;
  try {
    const tasks = await TaskCollection.findOne({ userId: user.id });
    if (!tasks[day]) {
      res.status(400).json({ errors: ["Invalid day provided!"] });
      return;
    } else {
      let tasksAtTime = tasks[day].get(time);
      if (!tasksAtTime) {
        res.status(400).json({ errors: ["Invalid time provided!"] });
      } else {
        tasks[day].set(
          time,
          tasksAtTime.filter((task) => task._id.toString() !== id)
        );
      }
    }
    await TaskCollection(tasks).save();

    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: ["Internal server error!"] });
  }
};

module.exports = {
  addTask,
  getTasks,
  deleteTask,
};
