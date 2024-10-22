const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

module.exports = { Task, TaskSchema };
