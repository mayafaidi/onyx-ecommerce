import React from 'react';
import { Box, Button, Typography, Container, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import homeImg from "../../assets/imges/home1.png";

// ✅ مخطط التحقق Yup Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        `https://kashop1.runasp.net/api/Identity/Account/Login`,
        data
      );

      console.log("✅ Login successful:", response.data);

      // ✅ حفظ التوكن في LocalStorage
      const token = response.data.token || response.data.data?.token;
      if (token) {
        localStorage.setItem('userToken', token);
      } else {
        console.warn("⚠️ No token found in response:", response.data);
      }

      navigate('/home');
    } catch (error) {
      console.error("❌ Login failed:", error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
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
        color: "#fff",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" sx={{ mb: 3, textAlign: "center" }}>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 📨 Email */}
          <TextField
            {...register("email")}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* 🔒 Password */}
          <TextField
            {...register("password")}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* 🔘 Submit Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* ❗ رسالة خطأ */}
        {errorMessage && (
          <Typography
            variant="body2"
            sx={{ mt: 2, color: "red", textAlign: "center" }}
          >
            {errorMessage}
          </Typography>
        )}

        {/* 🔗 روابط مساعدة */}
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Forgot your password?
            </Link>
          </Typography>
          <Typography variant="body2" mt={1}>
            Don’t have an account?{" "}
            <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Create one
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
