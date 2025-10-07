import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import homeImg from "../../assets/imges/home1.png";

export default function Home_img() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${homeImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        Welcome to Onyx E-commerce Store 🛒
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 5, fontSize: "1.2rem", px: 4, py: 1.5, borderRadius: "2rem" }}
        onClick={() => navigate("/shopping")}
      >
        Start Shopping
      </Button>
    </Box>
  );
}
