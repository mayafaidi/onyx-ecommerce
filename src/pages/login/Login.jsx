import React from 'react';
import { Box, Button, Typography, Container, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import homeImg from "../../assets/imges/home1.png";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const request = await axios.post(`https://kashop1.runasp.net/api/Identity/Account/Login`, data);
      console.log(" Login successful:", request.data);
      navigate('/home');
    } catch (error) {
      console.error(" Login failed:", error);
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
      <Container maxWidth="sm"    >
        <Typography variant="h3" sx={{ mb: 3, textAlign: "center" }}>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register("email", { required: "Email is required" })} label="Email" variant="outlined" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
          <TextField {...register("password", { required: "Password is required" })} label="Password" type="password" variant="outlined" fullWidth margin="normal" error={!!errors.password} helperText={errors.password?.message} />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>Forgot your password?</Link>
          </Typography>
          <Typography variant="body2" mt={1}>
            Don’t have an account? <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>Create one</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
