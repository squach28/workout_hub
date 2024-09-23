import {
  Box,
  Paper,
  Stack,
  Typography,
  Link,
  TextField,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyItems="center"
      sx={{
        background: "rgba(188, 219, 167, 0.2)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(2.9px)",
      }}
    >
      <Stack
        sx={{
          width: { xs: "90%", md: "auto" },
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <LoginForm />
      </Stack>
    </Box>
  );
};

const LoginForm = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        px: { xs: 2, md: 5 },
        py: { xs: 2, md: 4 },
        minWidth: { md: "400px" },
      }}
    >
      <Stack sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Link
          to="/"
          component={RouterLink}
          sx={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Workout Hub</Typography>
        </Link>
        <Typography variant="h4">Log in</Typography>
        <TextField
          id="email"
          name="email"
          size="small"
          label="Email"
          variant="outlined"
          sx={{ backgroundColor: "#FCFCFC" }}
        />
        <TextField
          id="password"
          name="password"
          size="small"
          label="Password"
          variant="outlined"
          sx={{ backgroundColor: "#FCFCFC" }}
        />
        <Link to="/forgotPassword" component={RouterLink}>
          <Typography sx={{ textAlign: "right" }}>Forgot password?</Typography>
        </Link>
        <Button variant="contained" color="primary">
          Log in
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Don't have an account?
          <Link
            to="/signup"
            component={RouterLink}
            sx={{ mx: 0.5, color: "black", fontWeight: "bold" }}
          >
            Sign Up
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Login;
