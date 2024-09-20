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
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { UserSignUpData } from "../types/UserSignUpData";

const SignUp = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyItems="center"
      sx={{
        background: "rgba(188, 219, 167, 0.2)",
        "border-radius": "16px",
        "box-shadow": "0 4px 30px rgba(0, 0, 0, 0.1)",
        "backdrop-filter": "blur(2.9px)",
        "-webkit-backdrop-filter": "blur(2.9px)",
      }}
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
  const [userSignUpData, setUserSignUpData] = useState<UserSignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserSignUpData({
      ...userSignUpData,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSignUp = () => {};

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
          id="firstName"
          name="firstName"
          size="small"
          label="First Name"
          variant="outlined"
          onChange={handleFormChange}
          value={userSignUpData.firstName}
          sx={{ backgroundColor: "#FCFCFC" }}
        />
        <TextField
          id="lastName"
          name="lastName"
          size="small"
          label="Last Name"
          variant="outlined"
          onChange={handleFormChange}
          value={userSignUpData.lastName}
          sx={{ backgroundColor: "#FCFCFC" }}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          size="small"
          label="Email"
          variant="outlined"
          onChange={handleFormChange}
          value={userSignUpData.email}
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
            value={userSignUpData.password}
            sx={{ backgroundColor: "#FCFCFC" }}
            label="Password"
          />
        </FormControl>
        <FormControl size="small" variant="outlined">
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <OutlinedInput
            id="confirmPassword"
            name="confirmPassword"
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
            onChange={handleFormChange}
            value={userSignUpData.confirmPassword}
            sx={{ backgroundColor: "#FCFCFC" }}
            label="Confirm Password"
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1 }}
          onClick={handleSignUp}
        >
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
