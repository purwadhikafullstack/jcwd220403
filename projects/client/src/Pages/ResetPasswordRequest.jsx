import React from 'react';
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  Center,
  Heading,
} from '@chakra-ui/react';
import axios from '../api/axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPasswordRequest() {
  const [email, setEmail] = useState('');

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post(`/forgotPassword`, { email });

      await toast.promise(
        res,
        {
          pending: 'submitting on progress...',
          success: 'Request success, please check your email',
          error: 'Submitting fail 😢',
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
              Forgot your password?
            </Heading>
          </Center>
          <Center fontSize={{ base: 'sm', sm: 'md' }} color={'black'}>
            No worries! Enter your email address and we'll send you the
            instructions to reset your password.
          </Center>
          <FormControl isRequired>
            <Center>
              <Input
                type='email'
                name='email'
                textAlign={'center'}
                onChange={handleInput}
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
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </section>
  );
}

export default ResetPasswordRequest;
