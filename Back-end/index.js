const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./db.js");
const User = require("./models/user.js");
const TaskCollection = require("./models/taskCollection.js");

// Routes
const authRoutes = require("./routes/authRoutes.js");
const tasksRoutes = require("./routes/tasksRoutes.js");

// Middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());
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

//test route        TODO: need to remove this
// app.get("/api/test", async (req, res) => {
//   console.log("cookie from req :", req.cookies.Token);
//   // console.log("cookie from req header : ", req.header.cookie);

//   res.status(200).json();
// });
