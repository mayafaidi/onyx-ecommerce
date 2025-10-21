import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import homeImg from "../../assets/imges/home1.png";
import ResponsiveAppBar from '../../component/navbar/MenuAppBar';
import { useTranslation } from 'react-i18next'; 

export default function About() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          backgroundImage: `url(${homeImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          width: "100%",
          minHeight: "100vh",
          py: 10,
        }}
      >
        <Box 
        sx={{
backgroundColor:"#060030ff",
width:"35%",
height:"20%",
borderRadius:"2pc"

        }}
        >
          <Typography variant='h4' sx={{ mb: 2 }}>
            {t('welcometo')}
          </Typography>
          <Typography variant='body1' sx={{ mb: 2 }}>
            {t('this')}
          </Typography>
          <Typography variant='body1'>
            {t('contact')}:{" "}
            <Link href="mailto:your-email@example.com" color="inherit" underline="hover">
              mayafaidi20@gmail.com
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  )
}
