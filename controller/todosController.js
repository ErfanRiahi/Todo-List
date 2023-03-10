const Todo = require("../model/Todo");

// @desc - all todos
// @route - GET '/todos'
// @access - public
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    if (!todos) return res.status(204).json({ message: "No todo found" });
    res.json(todos);
  } catch (err) {
    console.log(err);
  }
};

// @desc - create a todo
// @route - POST '/todos'
// @access - public
const createTodo = async (req, res) => {
  const { title } = req?.body;
  if (!title) return res.status(400).json({ message: `title is required.` });
  try {
    await Todo.create({ title: req.body.title });
    const allTodo = await Todo.find();
    res.json(allTodo);
  } catch (err) {
    console.log(err);
  }
};

// @desc - update a todo
// @route - PUT '/todos'
// @access - public
const updateTodo = async (req, res) => {
  const { title, id } = req?.body;
  if (!id) return res.status(400).json({ message: "ID parameter is required" });

  try {
    const todo = await Todo.findOne({ _id: id });
    if (!todo)
      return res
        .status(204)
        .json({ message: `no todo matches with ID: ${id}` });

    if (req.body?.title) todo.title = title;

    await todo.save();
    const allTodo = await Todo.find();
    res.json(allTodo);
  } catch (err) {
    console.log(err);
  }
};

// @desc - delete a todo
// @route - DELETE '/todos'
// @access - public
const deleteTodo = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: `todo ID is required.` });
  try {
    const todo = await Todo.findOne({ _id: req.body.id });
    if (!todo)
      return res
        .status(204)
        .json({ message: `no matches todo with ID: ${req.body.id}.` });
    await todo.deleteOne();
    const allTodo = await Todo.find();
    res.json(allTodo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
