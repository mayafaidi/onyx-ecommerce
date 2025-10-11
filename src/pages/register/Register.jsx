import React from 'react';
import { Box, TextField, Typography, Button, Container } from "@mui/material";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import homeImg from "../../assets/imges/home1.png";

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const request = await axios.post(`https://kashop1.runasp.net/api/Identity/Account/Register`, data);
      console.log(" Registration successful:", request.data);
      navigate('/');
    } catch (error) {
  console.error("Registration failed:", error.response?.data || error);
    }
  };

  return (
    <Box py={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${homeImg})`, backgroundSize: "cover", minHeight: "100vh", color: "#fff" }}>
      <Container maxWidth="sm">
        <Typography variant="h3" sx={{ mb: 3, textAlign: "center" }}>Register</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register("email", { required: "Email is required" })} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
          <TextField {...register("userName", { required: "Username is required" })} label="Username" fullWidth margin="normal" error={!!errors.userName} helperText={errors.userName?.message} />
          <TextField {...register("fullName", { required: "Full name is required" })} label="Full Name" fullWidth margin="normal" error={!!errors.fullName} helperText={errors.fullName?.message} />
          <TextField {...register("phoneNumber", { required: "Phone number is required" })} label="Phone Number" fullWidth margin="normal" error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />
          <TextField {...register("password", { required: "Password is required" })} label="Password" type="password" fullWidth margin="normal" error={!!errors.password} helperText={errors.password?.message} />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>Register</Button>
        </form>
      </Container>
    </Box>
  );
}
