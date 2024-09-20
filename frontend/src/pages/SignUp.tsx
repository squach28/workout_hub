import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { VisibilityOff, Visibility } from "@mui/icons-material";

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
          width: { xs: "90%", md: "auto" },
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        px: { xs: 2, md: 5 },
        py: { xs: 2, md: 4 },
        minWidth: { md: "400px" },
      }}
    >
      <Stack sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
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
        <FormControl size="small" variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl size="small" variant="outlined">
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <OutlinedInput
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm passsword visibility"
                  edge="end"
                  onClick={handleClickShowConfirmPassword}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
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
