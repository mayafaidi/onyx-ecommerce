import React from 'react';
import { Box, Button, Typography, Container, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import homeImg from "../../assets/imges/home1.png";

// ✅ مخطط التحقق Yup Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  code: yup
    .string()
    .required("Reset code is required")
    .length(6, "Reset code must be 6 digits"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], "Passwords do not match")
    .required("Please confirm your password"),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.patch(
        `https://kashop1.runasp.net/api/Identity/Account/reset-password`,
        {
          email: data.email,
          code: data.code,
          newPassword: data.newPassword,
        }
      );

      console.log("✅ Password reset successful:", response.data);
      setMessage("✅ Password has been reset successfully!");
      setTimeout(() => navigate('/'), 2000); // بعد ثانيتين يرجع لصفحة تسجيل الدخول
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error);
      setMessage("❌ Failed to reset password. Please check your code or email.");
    } finally {
      setLoading(false);
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
        <Typography variant="h3" sx={{ mb: 3, textAlign: "center", color: "white" }}>
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email")}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            {...register("code")}
            label="Code"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.code}
            helperText={errors.code?.message}
          />

          <TextField
            {...register("newPassword")}
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          <TextField
            {...register("confirmPassword")}
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        {message && (
          <Typography
            variant="body1"
            sx={{
              mt: 3,
              textAlign: "center",
              color: message.startsWith("✅") ? "lightgreen" : "red",
            }}
          >
            {message}
          </Typography>
        )}

        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            <Button
              onClick={() => navigate('/')}
              sx={{ textTransform: 'none', color: '#1976d2' }}
            >
              Back to Login
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
