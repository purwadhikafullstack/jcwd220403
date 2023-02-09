import React from 'react';
import { TripsProvider } from '../../context/TripsProvider';
import Trips from './Trips';

function TripsPage() {
  return (
    <TripsProvider>
      <Trips />
    </TripsProvider>
  );
}

export default TripsPage;
