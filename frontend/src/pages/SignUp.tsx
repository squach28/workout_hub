import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SignUp = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyItems="center"
    >
      <Stack
        sx={{
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <SignUpForm />
      </Stack>
    </Box>
  );
};

const SignUpForm = () => {
  return (
    <Paper elevation={4} sx={{ px: 5, py: 4, minWidth: "300px" }}>
      <Stack sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="subtitle1">Workout Hub</Typography>
        <Typography variant="h4">Sign up</Typography>
        <TextField
          size="small"
          label="First Name"
          variant="outlined"
          sx={{ backgroundColor: "#FCFCFC" }}
        />
        <TextField
          size="small"
          label="Last Name"
          variant="outlined"
          sx={{ backgroundColor: "#FCFCFC" }}
        />
        <TextField
          type="email"
          size="small"
          label="Email"
          variant="outlined"
          sx={{ backgroundColor: "#FCFCFC" }}
        />
        <TextField
          type="password"
          size="small"
          label="Password"
          variant="outlined"
          sx={{ backgroundColor: "#FCFCFC" }}
        />
        <TextField
          type="password"
          size="small"
          label="Confirm Password"
          variant="outlined"
          sx={{ backgroundColor: "#FCFCFC" }}
        />
        <Button variant="contained" sx={{ backgroundColor: "black", mt: 1 }}>
          Sign up
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?
          <Link
            component={RouterLink}
            sx={{ mx: 0.5, color: "black", fontWeight: "bold" }}
            to="/login"
          >
            Sign in
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default SignUp;
