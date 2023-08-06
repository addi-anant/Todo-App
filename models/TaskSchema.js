const mongoose = require("mongoose");

const Task = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Task", Task);
