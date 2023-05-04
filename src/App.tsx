import "./App.css";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { Outlet, Link } from "react-router-dom";

const drawerWidth = 240;

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Grades Tech Test
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding button component={Link} to="/">
              <ListItemButton>
                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding button component={Link} to="/students/new">
              <ListItemButton>
                <ListItemText>Add New Students</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding button component={Link} to="/students">
              <ListItemButton>
                <ListItemText>Students List</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding button component={Link} to="/courses/new">
              <ListItemButton>
                <ListItemText>Add New Courses</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding button component={Link} to="/courses">
              <ListItemButton>
                <ListItemText>Courses List</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding button component={Link} to="/results/new">
              <ListItemButton>
                <ListItemText>Add New Results</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding button component={Link} to="/results">
              <ListItemButton>
                <ListItemText>Results List</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
