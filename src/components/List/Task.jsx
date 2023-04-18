import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
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
import MoreVert from "@mui/icons-material/MoreVert";
import { yellow } from "@mui/material/colors";

export const Task = ({ props }) => {
  const { singleTask, index, setAllTasks, setSearchedTask } = props;
  const [taskStatus, setTaskStatus] = useState(false); // control circular progress, when task deleting in database
  const [taskStatusEditing, setTaskStatusEditing] = useState(false); // control circular progress, when task editing in database
  const [taskEditing, setTaskEditing] = useState(false); // control showing text field of edit when clicked on edit icon
  const [textFiledValue, setTextFieldValue] = useState(); // control the title of task while editing
  const [anchorEl, setAnchorEl] = useState(null); // control menu for three dot vertical
  const openMenu = Boolean(anchorEl);
  function handleCloseMenu() {
    setAnchorEl(null);
  }

  const updateTask = async (id, task) => {
    setTaskStatusEditing(true);
    const res = await updateTodo(id, task);
    if (res) {
      setTaskStatusEditing(false);
      setAllTasks(res);
      setSearchedTask(res);
      setTaskEditing(false);
    }
  };

  const deleteTask = async () => {
    setTaskStatus(true); //  circular progress started
    const res = await deleteTodo(singleTask._id);
    if (res) {
      setTaskStatus(false); //  if task deleted in database, circular progress will stop
      setAnchorEl(null); //  close menu of three dot (phone screen size)
      setAllTasks(res);
      setSearchedTask(res); //  all task will be refresh
    }
  };

  function handleStar() {
    setAnchorEl(null);
    updateTask(singleTask._id, {
      ...singleTask,
      important: !singleTask.important,
    });
  }

  const phoneSize = useMediaQuery("(min-width: 740px)");
  return (
    <TableRow>
      <TableCell sx={{ width: "20px" }} align="center">
        <Typography>{index + 1}</Typography>
      </TableCell>
      {/* {phoneSize ? : } */}
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
            variant={phoneSize ? "body1" : ""}
            sx={
              singleTask.completed
                ? { opacity: "0.5", textDecoration: "line-through" }
                : singleTask.important
                ? { fontWeight: "bold" }
                : { fontWeight: "normal" }
            }
          >
            {singleTask?.title}
          </Typography>
        )}
      </TableCell>
      <TableCell align="right">
        {phoneSize ? (
          taskStatus ? (
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

              <IconButton onClick={handleStar} sx={{ marginLeft: "5px" }}>
                {singleTask.important ? (
                  <Star sx={{ color: yellow[800] }} />
                ) : (
                  <StarBorder />
                )}
              </IconButton>
            </Box>
          )
        ) : (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Checkbox
              onChange={(e) =>
                updateTask(singleTask._id, {
                  title: singleTask.title,
                  completed: e.target.checked,
                })
              }
              checked={singleTask.completed}
            />
            {taskStatus ? (
              <CircularProgress />
            ) : (
              <Box>
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  onMouseLeave={handleCloseMenu}
                >
                  <MenuItem onClick={handleStar}>
                    {singleTask.important ? (
                      <Star sx={{ color: yellow[800], marginRight: "5px" }} />
                    ) : (
                      <StarBorder sx={{ marginRight: "5px" }} />
                    )}
                    Favorite
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setTaskEditing(true);
                      setTextFieldValue(singleTask.title);
                      setAnchorEl(null);
                    }}
                  >
                    <Edit sx={{ color: "blue", marginRight: "5px" }} />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={deleteTask}>
                    <Delete sx={{ color: "red", marginRight: "5px" }} /> Delete
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
};
