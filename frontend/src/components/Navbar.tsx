import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "green" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Workout Hub
          </Typography>
          <Box display={{ xs: "block", md: "none" }} sx={{ ml: "auto" }}>
            <IconButton color="secondary">
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
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
