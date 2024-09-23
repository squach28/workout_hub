import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  Typography,
  Link,
  IconButton,
  Drawer,
  ListItem,
  List,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const DrawerList = () => {
    return (
      <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer}>
        <List>
          <ListItem>
            <ListItemText>Workout Hub</ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              <Link
                to="/signup"
                component={RouterLink}
                sx={{ textDecoration: "none", color: "black" }}
              >
                Sign up
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link
                to="/login"
                component={RouterLink}
                sx={{ textDecoration: "none", color: "black" }}
              >
                Log in
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    );
  };

  // TODO: change the menu to a drawer
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Workout Hub
          </Typography>
          <Box display={{ xs: "block", md: "none" }} sx={{ ml: "auto" }}>
            <IconButton color="secondary" onClick={toggleDrawer}>
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer} anchor="right">
              {DrawerList()}
            </Drawer>
          </Box>
          <Box display={{ xs: "none", md: "block" }} sx={{ ml: "auto" }}>
            <Stack direction="row" gap={2}>
              <Link
                sx={{ color: "white", fontFamily: "roboto" }}
                component={RouterLink}
                to="/signup"
              >
                Sign up
              </Link>
              <Link
                sx={{ color: "white", fontFamily: "roboto" }}
                component={RouterLink}
                to="/login"
              >
                Log in
              </Link>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
