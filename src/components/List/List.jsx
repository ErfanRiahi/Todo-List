import "./style.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../../api/todoAPI";

export const List = () => {
  const [todos, setTodos] = useState();
  const [updatedTodo, setUpdatedTodo] = useState("");
  const refAdd = useRef();
  const refUpdate = useRef();

  useEffect(() => {
    getAllTodos().then((data) => setTodos(data.data));
  }, []);

  const addTask = async () => {
    if (refAdd.current.value.length > 30) {
      alert("maximum length is 30 characters");
      return;
    }
    if (refAdd.current.value.length == 0) {
      alert("you should write something");
      return;
    }
    setTodos(await addTodo(refAdd.current.value));
    refAdd.current.value = "";
  };

  const updateTask = async (id) => {
    setTodos(await updateTodo({ id, title: refUpdate.current.value }));
    setUpdatedTodo("");
  };

  const deleteTask = async (id) => {
    setTodos(await deleteTodo(id));
  };

  return (
    <main className="main">
      <form className="add" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder=" Enter your task..." ref={refAdd} />
        <button onClick={addTask} onKeyDown={addTask}>
          Add
        </button>
      </form>
      <div className="list">
        {todos ? (
          todos.map((todo, index) => {
            return (
              <div key={index} className="todo">
                {updatedTodo && updatedTodo === todo._id ? (
                  <div className="editing">
                    <span>
                      {index + 1}.
                      <input defaultValue={todo.title} ref={refUpdate} />
                    </span>
                    <div className="buttons">
                      <button onClick={() => setUpdatedTodo("")}>
                        <FontAwesomeIcon
                          icon={faXmarkCircle}
                          fontSize="1.2rem"
                          color="red"
                        />
                      </button>
                      <button onClick={() => updateTask(todo._id)}>
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          fontSize="1.2rem"
                          color="green"
                        />
                      </button>
                    </div>
                  </div>
                ) : (
                  <span>{`${index + 1}. ${todo.title}`}</span>
                )}
                <div className="edit-delete">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    color="blue"
                    cursor="pointer"
                    onClick={() => setUpdatedTodo(todo._id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    color="red"
                    cursor="pointer"
                    onClick={() => deleteTask(todo._id)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </main>
  );
};
