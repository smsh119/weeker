const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { dbConnect } = require("./db.js");

// Routes Imports
const authRoutes = require("./routes/authRoutes.js");
const tasksRoutes = require("./routes/tasksRoutes.js");

// Middleware imports
const authenticate = require("./middlewares/authenticate.js");

// Middlewares
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
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
app.use("/api/tasks", authenticate, tasksRoutes);

app.get("/api/", (req, res) => {
  res.status(200).json({ message: "Backend running!" });
});
