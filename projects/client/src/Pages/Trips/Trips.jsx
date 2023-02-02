import {
  Box,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Ongoing from '../../Components/Trips/Ongoing';
import Trip from '../../Components/Trips/TripTemplate';
import useAuth from '../../hooks/useAuth';

export default function Trips() {
  const axiosPrivate = useAxiosPrivate();
  const [trips, setTrips] = useState();
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const getTrips = async () => {
    try {
      const tripsData = await axiosPrivate.get(`/trips/${auth.userId}`);
      setTrips(tripsData.data);
      setLoading(false);
      console.log(trips);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrips();
  }, [loading]);

  return (
    <Box as={Container} maxW='7xl' mt={14} p={4}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <Heading>Trips</Heading>
        </GridItem>
        <GridItem>
          <Text>
            Here is the list of places that you've been and going to visit.
          </Text>
          <Text>
            Manage your booking history through our filter and links that
            available on each booking card.
          </Text>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
      {!loading && <Ongoing data={trips} />}
      <Box>
        <chakra.h3 fontSize='xl' fontWeight='600' mb={5}>
          {' '}
          Where you've been
        </chakra.h3>
        {!loading && (
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            }}
            gap={{ base: '8', sm: '12', md: '16' }}
          >
            {trips.map(
              (trip) =>
                trip.transactionStatus === 'Diproses' && (
                  <Trip
                    image={trip.picture}
                    heading={trip.property_name}
                    tenant={trip.fullName}
                    date={trip.checkIn + ' to ' + trip.CheckOut}
                    review={trip.review}
                  />
                )
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
