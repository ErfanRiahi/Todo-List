const express = require("express");
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../../controller/todosController");
const {
  getAllHistories,
  addToHistory,
} = require("../../controller/historyController");

const router = express.Router();

router
  .route("/")
  .get(getAllTodos)
  .post(createTodo)
  .put(updateTodo)
  .delete(deleteTodo);

router.route("/history").get(getAllHistories).post(addToHistory);

module.exports = router;
