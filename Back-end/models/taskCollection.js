const mongoose = require("mongoose");
const { TaskSchema } = require("./task.js");

const TaskCollectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    saturday: {
      type: Map,
      of: [TaskSchema],
    },
    sunday: {
      type: Map,
      of: [TaskSchema],
    },
    monday: {
      type: Map,
      of: [TaskSchema],
    },
    tuesday: {
      type: Map,
      of: [TaskSchema],
    },
    wednesday: {
      type: Map,
      of: [TaskSchema],
    },
    thursday: {
      type: Map,
      of: [TaskSchema],
    },
    friday: {
      type: Map,
      of: [TaskSchema],
    },
  },
  { timestamps: true }
);

const TaskCollection =
  mongoose.models.TaskCollection ||
  mongoose.model("TaskCollection", TaskCollectionSchema);

module.exports = TaskCollection;
