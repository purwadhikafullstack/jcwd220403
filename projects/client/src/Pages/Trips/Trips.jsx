import {
  Box,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
  Text,
  Heading,
  Image,
} from '@chakra-ui/react';
import Ongoing from '../../Components/Trips/Ongoing';
import Trip from '../../Components/Trips/TripTemplate';

export default function TripList() {
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
              'https://images.unsplash.com/photo-1674676618129-fcd0b0dd731b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&h=1000&q=80'
            }
            heading={'First Feature'}
            tenant='Agung'
            text={'Jan 11-17, 2023'}
          />
          <Trip
            heading={'Second Feature'}
            text={'Short text describing one of you features/service'}
          />
          <Trip
            heading={'Third Feature'}
            text={'Short text describing one of you features/service'}
          />
          <Trip
            heading={'Fourth Feature'}
            text={'Short text describing one of you features/service'}
          />
        </Grid>
      </Box>
    </Box>
  );
}
