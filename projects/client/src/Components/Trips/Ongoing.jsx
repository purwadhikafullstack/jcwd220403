import { Box, chakra, Grid } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import NoOngoingTrip from './NoOngoingTrip';
import OngoingList from './OngoingList';
import useTrips from '../../hooks/useTrips';
import Trip from './TripTemplate';

function Ongoing({ data }) {
  return (
    <Box mb={12}>
      <chakra.h3 fontSize='xl' fontWeight='600' mb={5}>
        Ongoing
      </chakra.h3>

      {data.map((trip, index) => {
        if (
          trip.transactionStatus === 'Menunggu Pembayaran' ||
          trip.transactionStatus === 'Menunggu Konfirmasi Pembayaran'
        ) {
          return (
            <Grid
              templateColumns={{
                base: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              }}
              gap={{ base: '8', sm: '12', md: '16' }}
            >
              <Trip
                key={index}
                image={trip.picture}
                heading={trip.property_name}
                tenant={trip.fullName}
                date={trip.checkIn + ' to ' + trip.CheckOut}
                status={trip.transactionStatus}
                transactionId={trip.id}
                paymentId={trip.payment_id}
                paymentmethodId={trip.paymentmethodId}
              />
            </Grid>
          );
        }
        return <NoOngoingTrip />;
      })}
    </Box>
  );
}

export default Ongoing;
