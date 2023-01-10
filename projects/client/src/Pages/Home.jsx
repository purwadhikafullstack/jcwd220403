import React from 'react';
import NavBar from '../Components/NavBar';
import HomeCard from '../Components/Card';
import Footer from '../Components/Footer';
import NavBot from '../Components/NavBot';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <NavBot />
    </div>
  );
};

export default Home;

