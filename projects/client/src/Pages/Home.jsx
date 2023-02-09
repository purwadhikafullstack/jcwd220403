import React from 'react';
import NavBar from '../Components/NavBar';
import { Outlet } from 'react-router-dom';
import { SearchProvider } from '../context/SearchProvider';

const Home = () => {
  return (
    <div>
      <SearchProvider>
        <NavBar />
        <Outlet />
      </SearchProvider>
    </div>
  );
};

export default Home;
