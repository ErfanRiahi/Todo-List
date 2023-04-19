import "./style.css";
import { useEffect, useState } from "react";
import {
  addTodo,
  addToHistory,
  getAllTodos,
  updateTodo,
} from "../../api/todoAPI";
import Button from "@mui/material/Button";
import {
  Alert,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
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
  const [searchedTask, setSearchedTask] = useState();
  const [task, setTask] = useState({
    title: "",
    completed: false,
    important: false,
  });

  const [taskAdded, setTaskAdded] = useState(false); //  for circular progress

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseShowAlert = () => setShowAlert(false);

  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const handleCloseAddTaskDialog = () => {
    setOpenAddTaskDialog(false);
    setTask({ ...task, title: "" });
  };

  useEffect(() => {
    getAllTodos().then((data) => {
      setAllTasks(data);
      setSearchedTask(data);
    });
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
        important: false,
      });
      setAllTasks(res);
      setSearchedTask(res);
      handleCloseAddTaskDialog();
      await addToHistory({
        title: task.title,
        typeOfModification: "Added",
        time: new Date().toLocaleString(),
      });
    }
  };

  return (
    <main className="main">
      <Box
        sx={
          useMediaQuery("(min-width: 740px)")
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
          label="Search..."
          autoComplete="off"
          onChange={(e) =>
            setSearchedTask(
              allTasks.filter((task) => task.title.includes(e.target.value))
            )
          }
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
          onClick={() => setOpenAddTaskDialog(true)}
        >
          <Typography>Add New Task</Typography>
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {searchedTask ? (
              searchedTask?.map((singleTask, index) => (
                <Task
                  key={index}
                  props={{ singleTask, index, setAllTasks, setSearchedTask }}
                />
              ))
            ) : (
              <TableRow>
                <TableCell>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openAddTaskDialog}
        onClose={handleCloseAddTaskDialog}
        fullWidth
      >
        <LinearProgress
          variant={taskAdded ? "indeterminate" : "determinate"}
          value={100}
        />
        <DialogTitle textAlign="center">Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Write a task..."
            autoComplete="off"
            onBlur={(e) => setTask({ ...task, title: e.target.value })}
            sx={{ marginTop: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddTaskDialog}>Cancel</Button>
          <Button onClick={addTask}>Ok</Button>
        </DialogActions>
      </Dialog>

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
    </main>
  );
};
