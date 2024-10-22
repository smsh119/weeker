const express = require("express");
const dotenv = require("dotenv");
const { dbConnect } = require("./db.js");
const User = require("./models/user.js");
const TaskCollection = require("./models/taskCollection.js");

// Routes
const authRoutes = require("./routes/authRoutes.js");
const tasksRoutes = require("./routes/tasksRoutes.js");

// Middlewares
const app = express();
app.use(express.json());
dotenv.config();

// Database connection
dbConnect(() => {
  app.listen(3000, () => {
    console.log("Server listening to port : 3000");
  });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);
