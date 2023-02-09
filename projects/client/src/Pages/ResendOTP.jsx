import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  Center,
  Heading,
  FormLabel,
} from '@chakra-ui/react';
import axios from '../api/axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResendOTP() {
  const [email, setEmail] = useState('');

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post(`/resendOTP`, { email });

      await toast.promise(
        res,
        {
          pending: 'Sending request...',
          success: `Request success, please check your email`,
          error: {
            render({ data }) {
              return `${data.response.data.message}`;
            },
          },
        },
        { position: toast.POSITION.TOP_CENTER }
      );
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <section>
      <ToastContainer />
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
              Resend OTP
            </Heading>
          </Center>
          <Center fontSize={{ base: 'sm', sm: 'md' }} color={'black'}>
            Enter your email address and we'll send you the OTP
          </Center>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              name='email'
              textAlign={'center'}
              onChange={handleInput}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button onClick={handleSubmit} colorScheme={'teal'}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </section>
  );
}

export default ResendOTP;
