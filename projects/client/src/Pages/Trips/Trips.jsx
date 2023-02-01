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
      <Ongoing />
      <Box>
        <chakra.h3 fontSize='xl' fontWeight='600' mb={5}>
          {' '}
          Where you've been
        </chakra.h3>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          gap={{ base: '8', sm: '12', md: '16' }}
        >
          <Trip
            image={
              'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&h=1000&q=80'
            }
            heading={'Villa Agung'}
            tenant='Agung'
            text={'Jan 11-17, 2023'}
          />
          <Trip
            image={
              'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&h=1000&q=80'
            }
            heading={'Villa Agung'}
            tenant='Agung'
            text={'Jan 20-21, 2023'}
          />
        </Grid>
      </Box>
    </Box>
  );
}
