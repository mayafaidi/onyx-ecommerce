import React from 'react';
import ResponsiveAppBar from '../../component/navbar/MenuAppBar';
import Homeimg from '../../component/home-img/Home_img';
import Footer from '../../component/footer/Footer';

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <Homeimg />
      <Footer/>
    </>
  );
}
