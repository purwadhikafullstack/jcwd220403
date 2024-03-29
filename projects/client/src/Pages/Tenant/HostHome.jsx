import React from 'react';
import { Outlet } from 'react-router-dom';
import WithSubnavigation from '../../Components/Tenant/HostNavbar';

const HostHome = () => {
  return (
    <main>
      <WithSubnavigation />
      <Outlet />
    </main>
  );
};

export default HostHome;
