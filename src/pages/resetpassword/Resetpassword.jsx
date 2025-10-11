import React from 'react';
import { Box, Button, Typography, Container, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import homeImg from "../../assets/imges/home1.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = React.useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(`https://kashop1.runasp.net/api/Identity/Account/reset-password`, data);
      console.log("✅ Password reset successful:", response.data);
      setMessage("✅ Password has been reset successfully!");
      setTimeout(() => navigate('/login'), 2000); // بعد ثانيتين يرجع لصفحة تسجيل الدخول
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to reset password. Please check your code or email.");
    }
  };

  return (
    <Box
      py={4}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${homeImg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" sx={{ mb: 3, textAlign: "center" }}>
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email", { required: "Email is required" })}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            {...register("code", { required: "Reset code is required" })}
            label="Code"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.code}
            helperText={errors.code?.message}
          />

          <TextField
            {...register("newPassword", { required: "New password is required" })}
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </form>

        {message && (
          <Typography
            variant="body1"
            sx={{ mt: 3, textAlign: "center", color: message.startsWith("✅") ? "green" : "red" }}
          >
            {message}
          </Typography>
        )}

        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            <Button onClick={() => navigate('/login')} sx={{ textTransform: 'none' }}>
              Back to Login
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
