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
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import axios from '../api/axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const getParams = useParams();

  const handleInput = (e) => {
    setPassword(e.target.value);
    // setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  textAlign={'center'}
                  onChange={handleInput}
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
            <FormControl isRequired>
              <FormLabel>Repeat Password</FormLabel>
              <InputGroup>
                <Input
                  type={showRepeatPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  textAlign={'center'}
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
          </VStack>
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

export default ResetPassword;
