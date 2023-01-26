import {
  Stack,
  Heading,
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DestinationAccount from './DestinationAccount';
export default function Transfer({ data }) {
  const [destinationAccount, setDestinationAccount] = useState();

  const totalDay = () => {
    return Math.floor(
      (new Date(data[0].checkOut).getTime() -
        new Date(data[0].checkIn).getTime()) /
        (1000 * 3600 * 24)
    );
  };

  function priceInCurrency() {
    const price = data[0].price * totalDay();

    let priceInRupiah = Intl.NumberFormat('id-ID', {
      currency: `IDR`,
      style: 'currency',
    });
    return priceInRupiah.format(price);
  }

  return (
    <Stack gap={10}>
      <Alert status='info' variant='subtle' color={'blue'} borderRadius={10}>
        <AlertIcon />
        <AlertDescription>
          You can transfer from any bank channel (m-banking, SMS banking or ATM)
        </AlertDescription>
      </Alert>
      <DestinationAccount
        destinationAccount={destinationAccount}
        setDestinationAccount={setDestinationAccount}
      />
      <Box backgroundColor='gray.50' borderRadius='5px' padding='20px'>
        <Heading size='md'>Price Details</Heading>
        <Stack marginTop='20px' direction='row' justifyContent='space-between'>
          <Text>
            {data[0].property_name}: {data[0].room_name} x {totalDay()}{' '}
            {'night(s)'}
          </Text>
          <Text>{priceInCurrency()}</Text>
        </Stack>
      </Box>
      <Button colorScheme='teal'>
        {/* <Link to={`/payment/${data[0].id}/process`}> */}
        <Link to={`/payment/${data[0].id}/${destinationAccount}`}>
          Pay with Bank Transfer
        </Link>
      </Button>
    </Stack>
  );
}
