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
  Divider,
  Text,
  HStack,
} from '@chakra-ui/react';

import { useState, useContext } from 'react';
import axios from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import AuthContext from '../context/AuthProvider';

export default function LoginCard() {
  const { setAuth } = useContext(AuthContext);
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
      const res = axios.post('/login', inputs, {
        withCredentials: true,
        headers: { 'content-Type': 'application/json' },
      });

      const toastify = await toast.promise(
        res,
        {
          pending: 'Login on progress...',
          success: 'Login success, welcome!',
          error: 'Login fail 😢',
        },
        { position: toast.POSITION.TOP_CENTER }
      );
      console.log(toastify.data?.user);
      const { userToken, userRole, userEmail } = toastify.data.user;
      setAuth({ userToken, userRole, userEmail });
      // handleRedirect();
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return loginSuccess ? (
    <Navigate to='/' />
  ) : (
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
          spacing={8}
          mx={'auto'}
          maxW={'xl'}
          py={5}
          px={6}
          // backdropFilter='auto'
          // backdropBlur='20px'
          // rounded='xl'
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
                  <Text color={'blue.400'}>
                    <RouterLink to='/forgotPassword'>
                      Forgot password?
                    </RouterLink>
                  </Text>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </Stack>
              <Divider />
              <HStack>
                <Button colorScheme='red' leftIcon={<FaGoogle />}>
                  Google
                </Button>
                <Button colorScheme='facebook' leftIcon={<FaFacebook />}>
                  Facebook
                </Button>
                <Button colorScheme='twitter' leftIcon={<FaTwitter />}>
                  Twitter
                </Button>
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </section>
  );
}
