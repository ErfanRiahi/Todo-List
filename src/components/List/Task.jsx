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

export const Task = ({ props }) => {
  const { singleTask, index, setAllTasks } = props;
  const [taskStatus, setTaskStatus] = useState(false);
  const [taskStatusEditing, setTaskStatusEditing] = useState(false);
  const [taskEditing, setTaskEditing] = useState(false);
  const [textFiledValue, setTextFieldValue] = useState(singleTask.title);
  const [task, setTask] = useState({
    title: "",
    completed: false,
  });

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
    setTaskStatus(true);
    const res = await deleteTodo(singleTask._id);
    if (res) {
      setTaskStatus(false);
      setAllTasks(res);
    }
  };

  return (
    <TableRow>
      <TableCell sx={{ width: "20px" }} align="center">
        <Typography>{index + 1}</Typography>
      </TableCell>
      {useMediaQuery("(min-width: 585px)") ? (
        <>
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
                variant="h6"
                sx={
                  singleTask.completed
                    ? { opacity: "0.5", textDecoration: "line-through" }
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
                  <IconButton onClick={() => setTaskEditing(true)}>
                    <Edit sx={{ color: "blue" }} />
                  </IconButton>
                )}

                <IconButton onClick={deleteTask}>
                  <Delete sx={{ color: "red" }} />
                </IconButton>
              </Box>
            )}
          </TableCell>
        </>
      ) : (
        <>
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
                variant="h6"
                sx={
                  singleTask.completed
                    ? { opacity: "0.5", textDecoration: "line-through" }
                    : {}
                }
              >
                {singleTask?.title}
              </Typography>
            )}

            <Box textAlign="right">
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
                    <IconButton onClick={() => setTaskEditing(true)}>
                      <Edit sx={{ color: "blue" }} />
                    </IconButton>
                  )}
                  <IconButton onClick={deleteTask}>
                    <Delete sx={{ color: "red" }} />
                  </IconButton>
                </Box>
              )}
            </Box>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};
