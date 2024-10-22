const mongoose = require("mongoose");

function dbConnect(startListening) {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
      console.log("Connected to DB...");
      startListening();
    })
    .catch(() => {
      console.log("Error connecting to DB...");
    });
}

module.exports = {
  dbConnect,
};
