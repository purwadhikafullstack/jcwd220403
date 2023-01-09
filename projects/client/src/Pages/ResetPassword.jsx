import React from 'react';
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  Center,
  Heading,
  VStack,
  FormLabel,
} from '@chakra-ui/react';
import axios from '../api/axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const getParams = useParams();

  const handleInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post(`/resetPassword/`, {
        password,
        id: getParams.id,
        token: getParams.token,
      });

      await toast.promise(
        res,
        {
          pending: 'submitting on progress...',
          success: 'Reset password success',
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
              Reset Password
            </Heading>
          </Center>
          <Center fontSize={{ base: 'sm', sm: 'md' }} color={'black'}>
            input your new password here
          </Center>
          <VStack>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                name='password'
                textAlign={'center'}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Repeat Password</FormLabel>
              <Input
                type='password'
                name='confirmPassword'
                textAlign={'center'}
              />
            </FormControl>
          </VStack>
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

export default ResetPassword;
