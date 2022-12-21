import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
} from '@chakra-ui/react';

import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

export default function LoginCard() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  function handleRedirect() {
    setInterval(() => {
      setLoginSuccess(true);
    }, 3000);
  }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post('/api/login', inputs);

      await toast.promise(
        res,
        {
          pending: 'Login on progress...',
          success: 'Login success, welcome!',
          error: 'Login fail 😢',
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

  return loginSuccess ? (
    <Navigate to='/' />
  ) : (
    <div>
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
          spacing={8}
          mx={'auto'}
          maxW={'lg'}
          py={12}
          px={6}
          backdropFilter='auto'
          backdropBlur='20px'
          rounded='xl'
        >
          <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <Stack align={'center'} marginBottom={10}>
              <Heading fontSize={'4xl'}>Login</Heading>
            </Stack>
            <Stack spacing={4}>
              <FormControl id='email' isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type='email' name='email' onChange={handleChange} />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  name='password'
                  onChange={handleChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                  gap={10}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}
