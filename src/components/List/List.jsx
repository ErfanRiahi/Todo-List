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
import Button from "@mui/material/Button";
import {
  Alert,
  Box,
  CircularProgress,
  LinearProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import { Task } from "./Task";

export const List = () => {
  const [allTasks, setAllTasks] = useState();
  const [task, setTask] = useState({
    title: "",
    completed: false,
  });

  const [taskAdded, setTaskAdded] = useState(false); //  for circular progress
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseShowAlert = () => setShowAlert(false);
  const refAdd = useRef();
  const refUpdate = useRef();

  useEffect(() => {
    getAllTodos().then((data) => setAllTasks(data));
  }, []);

  const addTask = async () => {
    if (task.title.length > 30) {
      setShowAlert(true);
      setAlertMessage("Maximum length is 30 characters");
      return;
    }
    if (task.title.length === 0) {
      setShowAlert(true);
      setAlertMessage("You should write something");
      return;
    }

    setTaskAdded(true);
    const res = await addTodo(task);
    if (res) {
      setTaskAdded(false);
      setTask({
        title: "",
        completed: false,
      });
      setAllTasks(res);
    }
  };

  const updateTask = async (id) => {
    setTodos(await updateTodo({ id, title: refUpdate.current.value }));
    setUpdatedTodo("");
  };

  function handleAddTask() {
    addTask();
  }

  return (
    <main className="main">
      {useMediaQuery("(min-width: 585px)")}
      <Box
        sx={
          useMediaQuery("(min-width: 585px)")
            ? {
                display: "grid",
                gridTemplateColumns: "70% 20% ",
                gap: "10%",
                marginBottom: "50px",
              }
            : {
                display: "grid",
                gap: "10px",
                marginBottom: "50px",
              }
        }
      >
        <TextField
          variant="outlined"
          label="Write a task..."
          autoComplete="off"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <Button
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            whiteSpace: "noWrap",
            backgroundColor: yellow[500],
            color: "black",
            "&:hover": { backgroundColor: yellow[500] },
          }}
          onClick={handleAddTask}
        >
          {taskAdded ? (
            <CircularProgress
              variant={taskAdded ? "indeterminate" : "determinate"}
              sx={taskAdded ? { display: "block" } : { display: "none" }}
            />
          ) : (
            <Typography>Add Task</Typography>
          )}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {allTasks?.map((singleTask, index) => (
              <Task key={index} props={{ singleTask, index, setAllTasks }} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseShowAlert}
      >
        <Alert severity="error" variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* <form className="add" onSubmit={(e) => e.preventDefault()}>
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
      </div> */}
    </main>
  );
};
