const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: [30, "maximum length is 30 characters"],
    required: [true, 'field "title" is required'],
  },
  completed: {
    type: Boolean,
  },
  important: {
    type: Boolean,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
