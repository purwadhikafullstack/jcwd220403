import React from 'react';
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  StackDivider,
  Box,
  Image,
} from '@chakra-ui/react';

import useAuth from '../../hooks/useAuth';

function TransactionCard({ data }) {
  const { auth } = useAuth();

  const totalDay = () => {
    return Math.floor(
      (new Date(data[0].checkOut).getTime() -
        new Date(data[0].checkIn).getTime()) /
        (1000 * 3600 * 24)
    );
  };

  return (
    <Card
      maxW='xl'
      maxH='md'
      boxShadow='xl'
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src={'http://localhost:2000/roomPicture/' + data[0].picture}
      ></Image>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='md' color='teal.400' textTransform='uppercase'>
              Booking ID
            </Heading>
            <Text size='lg' mt='10px'>
              {data[0].id}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' color='teal.400' textTransform='uppercase'>
              Booking Details
            </Heading>
            <Text pt='2' pb='2' fontSize='sm' fontWeight='bold'>
              {data[0].property_name}
            </Text>
            <Text>Check in: {new Date(data[0].checkIn).toDateString()}</Text>
            <Text>Stay for: {totalDay()} night(s)</Text>
            <Text>Room: {data[0].room_name}</Text>
          </Box>
          <Box>
            <Heading size='xs' color='teal.400' textTransform='uppercase'>
              Guest
            </Heading>
            <Box mt='3'>
              <Text>Booked by: {auth.name}</Text>
              <Text>Total guest(s): {data[0].total_guest}</Text>
            </Box>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default TransactionCard;
