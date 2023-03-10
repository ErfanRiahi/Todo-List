import axios from "axios";

const baseUrl = "http://localhost:5000/todos/";

export async function getAllTodos() {
  try {
    const todos = axios.get(baseUrl);
    return todos;
  } catch (err) {
    console.log(err);
  }
}

export async function addTodo(title) {
  try {
    const todo = await axios.post(baseUrl, {
      title,
    });
    return todo.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateTodo({ id, title }) {
  try {
    const updatedTodo = await axios.put(baseUrl, { id, title });
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
