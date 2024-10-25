const express = require("express");
const {
  addTask,
  getTasks,
  deleteTask,
  __for_Testing_to_Add_All_taskCollection,
} = require("../controllers/taskController.js");

const router = express.Router();

router.post("/all", __for_Testing_to_Add_All_taskCollection); // TODO: needs to remove this after integrating user with taskCollection

router.post("/", addTask);
router.get("/", getTasks);
router.delete("/", deleteTask);

module.exports = router;
