import React from 'react';
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  Center,
  Heading,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import axios from '../api/axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function ResetPasswordRequest() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmail(email)) {
      setError('Enter a valid email');
      setBorderColor('red');
    }

    if (!email) {
      setError('Please input your email');
      setBorderColor('red');
    }
    if (email && isEmail(email)) {
      setError('');
      setBorderColor('');
      setDisableButton(true);
      try {
        const res = axios.post(`/forgotPassword`, { email });

        await toast.promise(
          res,
          {
            pending: 'Submitting your data...',
            success: {
              render({ data }) {
                return `Request success, please check your email: ${data.data.email}`;
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
      } catch (error) {
        toast.error(error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setDisableButton(false);
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
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              name='email'
              textAlign={'center'}
              onChange={handleInput}
              borderColor={borderColor}
              isDisabled={disableButton}
            />
            <Text color={'red'} fontSize='14px'>
              {error}
            </Text>
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

export default ResetPasswordRequest;
