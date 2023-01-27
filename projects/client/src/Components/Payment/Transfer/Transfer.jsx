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
import { useParams, Navigate } from 'react-router-dom';
import DestinationAccount from './DestinationAccount';
import { ToastContainer, toast } from 'react-toastify';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

export default function Transfer({ data }) {
  const [destinationAccount, setDestinationAccount] = useState();
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();

  function handleRedirect() {
    setInterval(() => {
      setSubmitSuccess(true);
    }, 3000);
  }

  const totalDay = () => {
    return Math.floor(
      (new Date(data[0].checkOut).getTime() -
        new Date(data[0].checkIn).getTime()) /
        (1000 * 3600 * 24)
    );
  };

  const totalPrice = data[0].price * totalDay();

  function priceInCurrency() {
    let priceInRupiah = Intl.NumberFormat('id-ID', {
      currency: `IDR`,
      style: 'currency',
    });
    return priceInRupiah.format(totalPrice);
  }

  const submitPaymentMethod = async (e) => {
    e.preventDefault();
    setDisableSubmitBtn(true);
    try {
      const data = new FormData();
      data.append('paymentMethodId', destinationAccount);
      data.append('total', totalPrice);
      const res = axiosPrivate.post(`/payment/${params.transactionId}`, data);
      await toast.promise(
        res,
        {
          pending: 'Booking on progress...',
          success: {
            render({ data }) {
              return `${data.data.message}`;
            },
          },
          error: {
            render({ data }) {
              return `${data.response.data.message}`;
            },
          },
        },
        { position: toast.POSITION.TOP_CENTER }
      );

      setDisableSubmitBtn(false);
      handleRedirect();
    } catch (error) {
      console.log(error);
      toast.error('error: please check your data', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return submitSuccess ? (
    <Navigate to={`/payment/${params.transactionId}/${destinationAccount}`} />
  ) : (
    <Stack gap={2}>
      <ToastContainer />
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
      <Button
        colorScheme='teal'
        onClick={submitPaymentMethod}
        disabled={disableSubmitBtn}
      >
        Pay with Bank Transfer
      </Button>
    </Stack>
  );
}
