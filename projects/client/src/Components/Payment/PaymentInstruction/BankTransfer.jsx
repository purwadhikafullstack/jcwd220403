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
  Skeleton,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from '../../../api/axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Timer from './Timer';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

export default function BankTransfer({ data }) {
  const axiosPrivate = useAxiosPrivate();
  const [bank, setBank] = useState();
  const [payment, setPayment] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState();
  const [errorMessageForFile, setErrorMessageForFile] = useState('');
  const params = useParams();
  const totalDay = () => {
    return Math.floor(
      (new Date(data[0].checkOut).getTime() -
        new Date(data[0].checkIn).getTime()) /
        (1000 * 3600 * 24)
    );
  };
  const getpaymentData = async () => {
    try {
      const data = await axiosPrivate.get(`/payment/${params.paymentId}`);
      setPayment(data.data);
      console.log(payment);
    } catch (error) {
      console.log(error);
    }
  };

  const getBankData = async () => {
    try {
      const res = await axios.get(
        `payment/paymentMethod/${params.paymentMethodId}`
      );
      setBank(res.data);
      await getpaymentData();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 1024 * 1024; //1M
    if (file?.size > MAX_FILE_SIZE) {
      setErrorMessageForFile('file is too large');
      setSelectedFile();
    } else {
      setErrorMessageForFile('');
      setSelectedFile(file);
    }
  };

  const addPaymentProof = async () => {
    try {
      const data = new FormData();
      const paymentProofData = await axiosPrivate.post(
        `/payment/${params.transactionId}/verification`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBankData();
    getpaymentData();
  }, [loading]);

  function priceInCurrency() {
    const price = data[0].price * totalDay();

    let priceInRupiah = Intl.NumberFormat('id-ID', {
      currency: `IDR`,
      style: 'currency',
    });
    return priceInRupiah.format(price);
  }

  return loading ? (
    <Skeleton height='200px' width='200px'></Skeleton>
  ) : (
    <Stack gap={10}>
      <Alert status='info' variant='subtle' color={'blue'} borderRadius={10}>
        <AlertIcon />
        <AlertDescription>
          Payment instructions have been sent to your email
        </AlertDescription>
      </Alert>

      <Timer payment={payment} />

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
            <Text>Bank: {bank.method}</Text>
            <Box
              height='40px'
              width='40px'
              display='flex'
              backgroundImage={`url('http://localhost:2000/BankLogo/${bank.logo}')`}
              backgroundSize='contain'
              backgroundRepeat='no-repeat'
              backgroundPosition='top'
            ></Box>
          </Stack>
          <Stack marginBottom='10px'>
            <Text>Account Number: {bank.accountNumber}</Text>
            <Text>Account Holder Name: {bank.accountHolderName}</Text>
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
              onChange={(e) => handleFileInput(e)}
            ></Input>
            <Text color={'red'}>{errorMessageForFile}</Text>
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
