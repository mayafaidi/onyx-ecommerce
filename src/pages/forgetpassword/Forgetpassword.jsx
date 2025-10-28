import React from 'react';
import { Box, Button, Typography, Container, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import homeImg from "../../assets/imges/home1.png";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  //طريقة تانية عشان مااستوردت يوس ستيت فبعمل رياكت دوت
//بربط ال form +yup 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
//Api
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `https://kashop1.runasp.net/api/Identity/Account/forgot-password`,
        data
      );
      console.log(" Password reset link sent:", response.data);
      setMessage("Password reset link sent to your email!");
      navigate('/reset-password');
    } catch (error) {
      console.error(error);
      setMessage(" Error sending password reset link. Please try again.");
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
          Forgot Password
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send Reset Link
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
