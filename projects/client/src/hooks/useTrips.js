import { useContext } from 'react';

import TripsContext from '../context/TripsProvider';

const useTrips = () => {
  return useContext(TripsContext);
};

export default useTrips;
