const express = require("express");
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../../controller/todosController");
const router = express.Router();

router
  .route("/")
  .get(getAllTodos)
  .post(createTodo)
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;
