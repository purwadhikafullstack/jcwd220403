import { Box, chakra } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import NoOngoingTrip from './NoOngoingTrip';
import Trip from './TripTemplate';

function Ongoing({ data }) {
  const [ongoingtransaction, setOngoingTransaction] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkData = async () => {
    await data.map((trip) => {
      if (trip.transactionStatus === 'Menunggu Konfirmasi Pembayaran') {
        setOngoingTransaction((ongoingtransaction) => [
          ...ongoingtransaction,
          trip,
        ]);
      }
      return null;
    });
    setLoading(false);
  };

  useEffect(() => {
    checkData();
    console.log(ongoingtransaction);
  }, [loading]);

  return (
    <Box mb={12}>
      <chakra.h3 fontSize='xl' fontWeight='600' mb={5}>
        Ongoing
      </chakra.h3>
      {ongoingtransaction.length === 0 ? <NoOngoingTrip /> : <p>trips</p>}
    </Box>
  );
}

export default Ongoing;
