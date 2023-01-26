import {
  Stack,
  Heading,
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  Box,
  Text,
  Input,
  Divider,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
// import { useState } from 'react';
export default function BankTransfer({ data }) {
  // const [destinationAccount, setDestinationAccount] = useState();
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
          Payment instructions have been sent to your email
        </AlertDescription>
      </Alert>

      <Box>
        <Heading size='md' mb='15px'>
          Make A Payment Before
        </Heading>
        <Box
          border='1px'
          borderRadius='5px'
          padding='10px'
          borderColor='lightgray'
        >
          <Text>Today 05:22 PM</Text>
          <Text fontSize='10px'>Complete your payment within 2 hours</Text>
        </Box>
      </Box>

      <Box>
        <Heading size='md' mb='15px'>
          Please Transfer To
        </Heading>
        <Box
          border='1px'
          borderRadius='5px'
          padding='10px'
          borderColor='lightgray'
        >
          <Stack direction='row' justifyContent='space-between'>
            <Text>BRI</Text>
            <Box
              height='40px'
              width='40px'
              display='flex'
              backgroundImage="url('http://4.bp.blogspot.com/-tceaeWKDv00/UNhHf_6AdZI/AAAAAAAAERE/hR3lYKZxCiQ/s1600/Logo+Bank+BRI.jpg')"
              backgroundSize='contain'
              backgroundRepeat='no-repeat'
              backgroundPosition='top'
            ></Box>
          </Stack>
          <Stack marginBottom='10px'>
            <Text>Account Number: 1120 01 000057 30 5</Text>
            <Text>Account Holder Name: PT. Holistay</Text>
          </Stack>
          <Divider />
          <Text marginBottom='10px' marginTop='10px'>
            Transfer amount: {priceInCurrency()}
          </Text>
        </Box>
      </Box>

      <Box>
        <Heading size='md' mb='15px'>
          Complete Your Payment?
        </Heading>
        <Box
          border='1px'
          borderRadius='5px'
          padding='10px'
          borderColor='lightgray'
          display='flex'
          flexDirection='column'
          gap='20px'
        >
          <Text>Upload your transaction receipt here</Text>

          <FormControl isRequired>
            <FormLabel>Receipt Picture</FormLabel>
            <Input
              className='file-selector-verify'
              type={'file'}
              accept={'image/*'}
            ></Input>
            <Text color={'red'}>error message</Text>
          </FormControl>
          <Text fontSize='10px'>
            Once your payment is confirmed we will send your e-ticket to your
            email address
          </Text>
        </Box>
      </Box>

      <Button colorScheme='teal'>I Have Completed Payment</Button>
    </Stack>
  );
}
