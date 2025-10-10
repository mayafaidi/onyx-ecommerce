import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import homeImg from "../../assets/imges/home1.png";
import { useNavigate } from 'react-router-dom';
export default function Home_img() {
   const navigate = useNavigate(); 
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${homeImg})`,
        backgroundSize: "cover",
        padding: "40px",  
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold"  }}>
        Welcome to Onyx E-commerce Store 
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 5, fontSize: "1.2rem", px: 4, py: 1.5, borderRadius: "2rem" }}
        onClick={() => navigate("/product")}
      >
        Start Shopping
      </Button>
    </Box>
  );
}
