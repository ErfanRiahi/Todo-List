import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { deleteTodo, updateTodo } from "../../api/todoAPI";
import { useState } from "react";
import Edit from "@mui/icons-material/Edit";
import Cancel from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { yellow } from "@mui/material/colors";

export const Task = ({ props }) => {
  const { singleTask, index, setAllTasks } = props;
  const [taskStatus, setTaskStatus] = useState(false); // control circular progress, when task deleting in database
  const [taskStatusEditing, setTaskStatusEditing] = useState(false); // control circular progress, when task editing in database
  const [taskEditing, setTaskEditing] = useState(false); // control showing text field of edit when clicked on edit icon
  const [textFiledValue, setTextFieldValue] = useState(); // control the title of task while editing
  const [stared, setStared] = useState(false); //  when task stared and wait for response

  const updateTask = async (id, task) => {
    setTaskStatusEditing(true);
    const res = await updateTodo(id, task);
    if (res) {
      setTaskStatusEditing(false);
      setAllTasks(res);
      setTaskEditing(false);
    }
  };

  const deleteTask = async () => {
    setTaskStatus(true); //  circular progress started
    const res = await deleteTodo(singleTask._id);
    if (res) {
      setTaskStatus(false); //  if task deleted in database, circular progress will stop
      setAllTasks(res); //  all task will be refresh
    }
  };

  function handleStar() {
    setStared(true); // circular progress started

    const res = updateTask(singleTask._id, {
      ...singleTask,
      important: !singleTask.important,
    });
    if (res) setStared(false); //  if task updated, circular progress will stop
  }

  return (
    <TableRow>
      <TableCell sx={{ width: "20px" }} align="center">
        <Typography>{index + 1}</Typography>
      </TableCell>
      <TableCell align="left">
        {taskEditing ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Editing task..."
              value={textFiledValue}
              onChange={(e) => {
                setTextFieldValue(e.target.value);
              }}
            />
            {taskStatusEditing ? (
              <CircularProgress sx={{ marginLeft: "10px" }} />
            ) : (
              <Box>
                <IconButton
                  onClick={() => {
                    setTaskEditing(false);
                    setTextFieldValue(singleTask.title);
                  }}
                >
                  <Cancel color="error" />
                </IconButton>
                <IconButton
                  onClick={() =>
                    updateTask(singleTask._id, {
                      title: textFiledValue,
                      completed: singleTask.completed,
                    })
                  }
                >
                  <CheckCircle color="success" />
                </IconButton>
              </Box>
            )}
          </Box>
        ) : (
          <Typography
            sx={
              singleTask.completed
                ? { opacity: "0.5", textDecoration: "line-through" }
                : singleTask.important
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {singleTask?.title}
          </Typography>
        )}
      </TableCell>
      <TableCell align="right">
        {taskStatus ? (
          <CircularProgress />
        ) : (
          <Box>
            <Checkbox
              onChange={(e) =>
                updateTask(singleTask._id, {
                  title: singleTask.title,
                  completed: e.target.checked,
                })
              }
              checked={singleTask.completed}
            />
            {singleTask.completed ? (
              ""
            ) : (
              <IconButton
                onClick={() => {
                  setTaskEditing(true);
                  setTextFieldValue(singleTask.title);
                }}
              >
                <Edit sx={{ color: "blue" }} />
              </IconButton>
            )}

            <IconButton onClick={deleteTask}>
              <Delete sx={{ color: "red" }} />
            </IconButton>
          </Box>
        )}
      </TableCell>
      <TableCell sx={{ width: "10px", padding: "0" }}>
        {stared ? (
          <CircularProgress sx={{ marginRight: "10px" }} />
        ) : (
          <IconButton onClick={handleStar}>
            {singleTask.important ? (
              <Star sx={{ color: yellow[800] }} />
            ) : (
              <StarBorder />
            )}
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};
