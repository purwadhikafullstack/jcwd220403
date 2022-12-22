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
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Field, ErrorMessage, Formik, Form } from 'formik';

export default function SignupCopy() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const registerSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Please enter your name')
      .min(3, 'Full Name should be at least three characters'),
    email: Yup.string().email().required('Email is a required field'),
    password: Yup.string()
      .required('Password is a required field')
      .min(8, 'Password should be at least eight characters'),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Password does not matched'
    ),
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (data) => {
    data.preventDefault();
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

            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
              }}
              validationSchema={registerSchema}
              onSubmit={(values, action) => {
                handleSubmit();
                action.setFieldValue('fullName', '');
                action.setFieldValue('email', '');
                action.setFieldValue('password', '');
                action.setFieldValue('password_confirmation', '');
              }}
            >
              {(props) => {
                return (
                  <>
                    <Form>
                      <VStack spacing={4} align='flex-start'>
                        <FormControl isRequired>
                          <FormLabel htmlFor='name'>Full Name</FormLabel>
                          <Field
                            as={Input}
                            type='text'
                            name='fullName'
                            variant='filled'
                          />
                          <ErrorMessage
                            style={{ color: 'red' }}
                            component='div'
                            name='fullName'
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel htmlFor='email'>Email</FormLabel>
                          <Field
                            as={Input}
                            type='email'
                            name='email'
                            variant='filled'
                          />
                          <ErrorMessage
                            style={{ color: 'red' }}
                            component='div'
                            name='email'
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel htmlFor='password'>Password</FormLabel>
                          <InputGroup>
                            <Field
                              as={Input}
                              type={showPassword ? 'text' : 'password'}
                              name='password'
                              variant='filled'
                            />

                            <InputRightElement h={'full'}>
                              <Button
                                variant={'ghost'}
                                onClick={() =>
                                  setShowPassword(
                                    (showPassword) => !showPassword
                                  )
                                }
                              >
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <ErrorMessage
                            component='div'
                            name='password'
                            style={{ color: 'red' }}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel htmlFor='password_confirmation'>
                            Confirm Password
                          </FormLabel>
                          <InputGroup>
                            <Field
                              as={Input}
                              type={showRepeatPassword ? 'text' : 'password'}
                              name='password_confirmation'
                              variant='filled'
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
                                {showRepeatPassword ? (
                                  <ViewIcon />
                                ) : (
                                  <ViewOffIcon />
                                )}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <ErrorMessage
                            component='div'
                            name='password_confirmation'
                            style={{ color: 'red' }}
                          />
                        </FormControl>
                        <Button
                          type='submit'
                          width='100%'
                          bg={'blue.400'}
                          color={'white'}
                          _hover={{
                            bg: 'blue.500',
                          }}
                        >
                          Register
                        </Button>
                      </VStack>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}
