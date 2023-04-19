import { TabsContext } from "@mui/base";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";

export const Header = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  return (
    <Box>
      <header>
        <h3>Todo List</h3>
      </header>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Home" onClick={() => navigate("/")} centered="true" />
          <Tab
            label="History"
            onClick={() => navigate("/history")}
            centered="true"
          />
        </Tabs>
      </Box>
    </Box>
  );
};
