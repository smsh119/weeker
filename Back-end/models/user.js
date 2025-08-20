const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    settings: {
      startDayIndex: {
        type: Number,
        default: 0,
      },
      startHour: {
        type: Number,
        default: 6,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
