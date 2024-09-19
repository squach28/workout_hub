import { AppBar, Box, Stack, Toolbar, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Workout Hub
          </Typography>
          <Stack direction="row" gap={2} sx={{ ml: "auto" }}>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
