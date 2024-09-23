import {
  Box,
  Paper,
  Stack,
  Typography,
  Link,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserLogInData } from "../types/UserLogInData";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserLoginErrors } from "../types/UserLogInErrors";
import { validateUserLogInData } from "../utils/validators";

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
  const [userLoginData, setUserLoginData] = useState<UserLogInData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<UserLoginErrors>({
    email: "",
    password: "",
    valid: false,
  });
  const [error, setError] = useState<{ message: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLoginData({
      ...userLoginData,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    const currErrors = validateUserLogInData(userLoginData);
    setErrors(currErrors);
    if (currErrors.valid) {
      setError(null);
      setLoading(true);
      const user = {
        email: userLoginData.email,
        password: userLoginData.password,
      };
    }
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
          onChange={handleFormChange}
          value={userLoginData.email}
          error={errors.email !== ""}
          helperText={errors.email}
          sx={{ backgroundColor: "#FCFCFC" }}
        />
        <FormControl size="small" variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
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
            onChange={handleFormChange}
            value={userLoginData.password}
            error={errors.password !== ""}
            sx={{ backgroundColor: "#FCFCFC" }}
            label="Password"
          />
          <FormHelperText error={errors.password !== ""}>
            {errors.password}
          </FormHelperText>
        </FormControl>
        <Link
          to="/forgotPassword"
          component={RouterLink}
          sx={{ display: "inline", textAlign: "right", ml: "auto" }}
        >
          <Typography sx={{}}>Forgot password?</Typography>
        </Link>
        <Button variant="contained" color="primary" onClick={handleLogin}>
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
