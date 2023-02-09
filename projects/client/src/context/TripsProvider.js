import { createContext, useState } from 'react';

const TripsContext = createContext({});

export const TripsProvider = ({ children }) => {
  const [update, setUpdate] = useState({});

  return (
    <TripsContext.Provider value={{ update, setUpdate }}>
      {children}
    </TripsContext.Provider>
  );
};

export default TripsContext;
