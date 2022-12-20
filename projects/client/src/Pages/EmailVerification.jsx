import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  Center,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, Navigate } from 'react-router-dom';

export default function VerifyEmailForm() {
  const [verified, setVerified] = useState(false);
  const [OTP, setOTP] = useState('');
  const getTokenFromParams = useParams();

  function handleRedirect() {
    setInterval(() => {
      setVerified(true);
    }, 3000);
  }

  const handleOTP = (e) => {
    setOTP(e.target.value);
    console.log(OTP);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post(
        `/api/verification?token=${getTokenFromParams.token}`,
        { otp: OTP }
      );

      await toast.promise(
        res,
        {
          pending: 'verification on progress...',
          success: 'Verification Success!',
          error: 'Verification fail 😢',
        },
        { position: toast.POSITION.TOP_CENTER }
      );
      handleRedirect();
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return verified ? (
    <Navigate to='/login' />
  ) : (
    <div>
      <ToastContainer theme='colored' />
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={
          'url(https://source.unsplash.com/random/1920x1080/?house) center/cover no-repeat'
        }
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'sm'}
          bg={'white'}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={10}
        >
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Verify your Email
            </Heading>
          </Center>
          <Center fontSize={{ base: 'sm', sm: 'md' }} color={'black'}>
            Enter your OTP code here
          </Center>
          <FormControl>
            <Center>
              <Input
                type='number'
                name='otp'
                textAlign={'center'}
                onChange={handleOTP}
              />
            </Center>
          </FormControl>
          <Stack spacing={6}>
            <Button
              onClick={handleSubmit}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Verify
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </div>
  );
}
