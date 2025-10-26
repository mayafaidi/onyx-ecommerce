import React from 'react';
import { Box, TextField, Typography, Button, Container } from "@mui/material";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import homeImg from "../../assets/imges/home1.png";

// ✅ تعريف مخطط التحقق Yup Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  userName: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  fullName: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z\s]+$/, "Full name should contain only letters"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function Register() {
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
      const response = await axios.post(
        `https://kashop1.runasp.net/api/Identity/Account/Register`,
        data
      );
      console.log("✅ Registration successful:", response.data);

      setMessage("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error("❌ Registration failed:", error.response?.data || error);
      const errMsg =
        error.response?.data?.message || "Registration failed. Please try again.";
      setMessage(`❌ ${errMsg}`);
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
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email")}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            {...register("userName")}
            label="Username"
            fullWidth
            margin="normal"
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />

          <TextField
            {...register("fullName")}
            label="Full Name"
            fullWidth
            margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />

          <TextField
            {...register("phoneNumber")}
            label="Phone Number"
            fullWidth
            margin="normal"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />

          <TextField
            {...register("password")}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
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
      </Container>
    </Box>
  );
}
