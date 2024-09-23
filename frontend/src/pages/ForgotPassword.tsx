import {
  Box,
  Paper,
  Stack,
  Link,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ForgotPassword = () => {
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
        <ForgotPasswordForm />
      </Stack>
    </Box>
  );
};

const ForgotPasswordForm = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        px: { xs: 2, md: 5 },
        py: { xs: 2, md: 4 },
        minWidth: { md: "400px" },
        maxWidth: { md: "600px" },
      }}
    >
      <Stack sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Link
          to="/"
          component={RouterLink}
          sx={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Workout Hub</Typography>
        </Link>
        <Typography variant="h4">Forgot Password</Typography>
        <Typography>
          Enter your email to reset your password. A link will be sent to your
          email to reset your password.
        </Typography>
        <TextField
          id="email"
          name="email"
          size="small"
          label="Email"
          variant="outlined"
        />
        <Button variant="contained">Reset Password</Button>
      </Stack>
    </Paper>
  );
};

export default ForgotPassword;
