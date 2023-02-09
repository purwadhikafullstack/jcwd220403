import {
  Box,
  Divider,
  Grid,
  GridItem,
  Container,
  Text,
  chakra,
  Stack,
  Button,
  Heading,
  ButtonGroup,
} from '@chakra-ui/react';
import { createContext, useEffect } from 'react';
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Ongoing from '../../Components/Trips/Ongoing';
import useAuth from '../../hooks/useAuth';
import Declined from '../../Components/Trips/Declined';
import Finished from '../../Components/Trips/Finished';
import useTrips from '../../hooks/useTrips';

export default function Trips() {
  const axiosPrivate = useAxiosPrivate();
  const [trips, setTrips] = useState();
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const [month, setMonth] = useState('');
  const { update } = useTrips();

  let ar = [];
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format;
  for (let x = 0; x <= 2; x++) {
    ar.push(monthName(new Date().setMonth(new Date().getMonth() - x)));
  }

  const getTrips = async () => {
    try {
      const tripsData = await axiosPrivate.get(
        `/trips/${auth.userId}?month=${month}`
      );
      setTrips(tripsData.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, month, update]);

  return loading ? null : (
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
      <Divider mt={12} mb={5} />
      <chakra.h3 fontSize='xl' fontWeight='600' mb={5}>
        Filter
      </chakra.h3>
      <Stack>
        <ButtonGroup colorScheme={'blue'}>
          <Button colorScheme={'gray'} onClick={() => setMonth('')}>
            All Trips
          </Button>
          {ar.map((i, index) => (
            <Button onClick={() => setMonth(index)}>{i}</Button>
          ))}
        </ButtonGroup>
      </Stack>
      <Divider mt={5} mb={12} />
      <Ongoing data={trips} />
      <Divider mt={12} mb={12} />
      <Finished trips={trips} />
      <Divider mt={12} mb={12} />
      <Declined trips={trips} />
    </Box>
  );
}

export const tripContext = createContext();
