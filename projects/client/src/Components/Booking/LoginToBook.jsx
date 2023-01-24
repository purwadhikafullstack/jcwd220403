import { Button, Stack } from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookingPolicy from './BookingPolicy';

function LoginToBook() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
      {auth?.accessToken ? (
        <Stack spacing={6}>
          <BookingPolicy />
          <Button
            w={'full'}
            color={'teal.400'}
            onClick={() => navigate('/payment')}
          >
            Confirm and Pay
          </Button>
        </Stack>
      ) : (
        <Stack w={'full'} spacing={5}>
          <Button color={'teal.400'}>
            <Link to={'/login'}>Log in or sign up to book</Link>{' '}
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default LoginToBook;
