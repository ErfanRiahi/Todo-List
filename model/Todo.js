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
});

module.exports = mongoose.model("Todo", todoSchema);
