const express = require("express");
const {
  addTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController.js");

const router = express.Router();

router.post("/", addTask);
router.get("/", getTasks);
router.delete("/", deleteTask);

module.exports = router;
