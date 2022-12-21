import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Field, ErrorMessage, Formik, Form } from 'formik';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.post('/api/register', inputs);

      await toast.promise(
        res,
        {
          pending: 'registration on progress...',
          success:
            'registration Success! please check your email for verification link 💌',
          error: 'registration fail 😢',
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
          spacing={4}
          mx={'auto'}
          minW={'xl'}
          py={5}
          px={6}
          backdropFilter='auto'
          backdropBlur='20px'
          rounded='xl'
        >
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack align={'center'} marginBottom={5}>
              <Heading fontSize={'5xl'} textAlign={'center'}>
                Register
              </Heading>
            </Stack>
            <Stack spacing={2}>
              <FormControl id='fullName' isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input type='text' name='fullName' onChange={handleChange} />
              </FormControl>
              <FormControl id='email' isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type='email' name='email' onChange={handleChange} />
                {}
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id='repeatPassword' isRequired>
                <FormLabel>Repeat Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handleChange}
                    name='repeatPassword'
                    type={showRepeatPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowRepeatPassword(
                          (showRepeatPassword) => !showRepeatPassword
                        )
                      }
                    >
                      {showRepeatPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={handleSubmit}
                  loadingText='Submitting'
                  size='lg'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'} color={'blue.400'}>
                  <Link to={'/login'}> Already a user? Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}
