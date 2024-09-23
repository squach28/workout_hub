import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
import { validateUserSignUpData } from "../utils/validators";
import axios from "axios";

const SignUp = () => {
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
    valid: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);
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

  const handleSignUp = () => {
    const currErrors = validateUserSignUpData(userSignUpData);
    setErrors(currErrors);
    if (currErrors.valid) {
      setError(null);
      setLoading(true);
      const user = {
        firstName: userSignUpData.firstName,
        lastName: userSignUpData.lastName,
        email: userSignUpData.email,
        password: userSignUpData.password,
      };
      axios
        .post(`${import.meta.env.VITE_API_URL}/auth/signup`, user)
        .then((res) => {
          if (res.status === 201) {
            console.log("success!");
          }
        })
        .catch((e) => {
          console.log(e.response.data);
          setError(e.response.data);
        })
        .finally(() => setLoading(false));
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
          <Typography variant="subtitle1">Workout Hub</Typography>
        </Link>
        <Typography variant="h4">Sign up</Typography>
        <TextField
          id="firstName"
          name="firstName"
          size="small"
          label="First Name"
          variant="outlined"
          onChange={handleFormChange}
          value={userSignUpData.firstName}
          error={errors.firstName !== ""}
          helperText={errors.firstName}
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
          error={errors.lastName !== ""}
          helperText={errors.lastName}
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
          error={errors.email !== ""}
          helperText={errors.email}
          sx={{ backgroundColor: "#FCFCFC" }}
        />
        <FormControl size="small" variant="outlined">
          <InputLabel htmlFor="password" error={errors.password !== ""}>
            Password
          </InputLabel>
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
            error={errors.password !== ""}
            sx={{ backgroundColor: "#FCFCFC" }}
            label="Password"
          />
          <FormHelperText error={errors.password !== ""}>
            {errors.password}
          </FormHelperText>
        </FormControl>
        <FormControl size="small" variant="outlined">
          <InputLabel
            htmlFor="confirmPassword"
            error={errors.confirmPassword !== ""}
          >
            Confirm Password
          </InputLabel>
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
            error={errors.confirmPassword !== ""}
            sx={{ backgroundColor: "#FCFCFC" }}
            label="Confirm Password"
          />
          <FormHelperText error={errors.confirmPassword !== ""}>
            {errors.confirmPassword}
          </FormHelperText>
        </FormControl>
        {error !== null ? (
          <Typography variant="caption" color="error">
            {error.message}
          </Typography>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1 }}
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?
          <Link
            component={RouterLink}
            sx={{ mx: 0.5, color: "black", fontWeight: "bold" }}
            to="/login"
          >
            Log in
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default SignUp;
