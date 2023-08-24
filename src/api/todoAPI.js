import axios from "axios";

const baseUrl = "https://todo-list-493w.onrender.com";
// const baseUrl = "https://aps-todolist.iran.liara.run";
// const baseUrl = "http://localhost:5000";

// ******************** Todo ********************
export async function getAllTodos() {
  try {
    const todos = await axios.get(baseUrl);
    return todos.data;
  } catch (err) {
    console.log(err);
  }
}

export async function addTodo(task) {
  try {
    const todo = await axios.post(baseUrl, task);
    return todo.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateTodo(id, task) {
  try {
    const updatedTodo = await axios.put(baseUrl, { id, task });
    return updatedTodo.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTodo(id) {
  try {
    const res = await axios.delete(baseUrl, {
      data: {
        id,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// ******************** History ********************
export async function getAllHistories() {
  try {
    const res = await axios.get(baseUrl + "/history");
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function addToHistory(history) {
  try {
    const res = await axios.post(baseUrl + "/history", history);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
