import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, Navigate, useParams, Link } from 'react-router-dom';
import BookingPolicy from '../../Components/Booking/BookingPolicy';
import BookingDate from '../../Components/Booking/BookingDate';
import GuestList from '../../Components/Booking/GuestList';
import LoginToBook from '../../Components/Booking/LoginToBook';
import PropertyCard from '../../Components/Booking/PropertyCard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';

export default function BookingDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [adultGuest, setAdultGuest] = useState(1);
  const [childrenGuest, setChildrenGuest] = useState(0);
  const [infantGuest, setInfantGuest] = useState(0);
  const [date, setDate] = useState();
  const [day, setDay] = useState(0);
  const [submittedData, setSubmittedData] = useState();

  const numberOfDays = () => {
    date !== undefined
      ? setDay(
          Math.floor(
            (date[1].getTime() - date[0].getTime()) / (1000 * 3600 * 24)
          )
        )
      : setDay(0);
  };

  const totalGuest = () => {
    const totalGuestList = adultGuest + childrenGuest + infantGuest;
    return totalGuestList;
  };

  function handleRedirect() {
    setInterval(() => {
      setSubmitSuccess(true);
    }, 3000);
  }

  const submitBookingForm = async (e) => {
    e.preventDefault();
    setDisableSubmitBtn(true);
    try {
      const data = new FormData();
      const userId = auth.userId;
      data.append('userId', userId);
      data.append('roomId', params.roomId);
      data.append('checkIn', date[0].toISOString().slice(0, 10));
      data.append('checkOut', date[1].toISOString().slice(0, 10));
      data.append('adultGuest', adultGuest);
      data.append('childrenGuest', childrenGuest);
      data.append('infantGuest', infantGuest);
      const res = axiosPrivate.post('/transaction', data);
      const toastify = await toast.promise(
        res,
        {
          pending: 'Booking on progress...',
          success: {
            render({ data }) {
              return `Success,  ${data.data.message}`;
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
      console.log(toastify);
      setSubmittedData(toastify.data.roomDetail.id);
    } catch (error) {
      console.log(error);
    }
    setDisableSubmitBtn(false);
    console.log(submittedData);
    handleRedirect();
  };

  useEffect(() => {
    numberOfDays();
  }, [date]);

  return submitSuccess ? (
    <Navigate to={`/payment/${submittedData}`} />
  ) : (
    <Stack
      minH={'100vh'}
      direction={{ base: 'column', md: 'row' }}
      justifyContent={'space-between'}
    >
      <ToastContainer />
      <Flex p={8} flex={1} justify={'center'}>
        <Stack spacing={6} maxW={'xl'}>
          <HStack>
            <IconButton
              colorScheme='teal'
              aria-label='Back to Property'
              icon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            />
            <Heading fontSize={'3xl'}>
              <Text color={'teal.400'} as={'span'}>
                Booking{' '}
              </Text>
              <Text color={'orange.400'} as={'span'}>
                Detail
              </Text>
            </Heading>
          </HStack>
          <Divider />
          <BookingDate inputDate={date} setInputDate={setDate} />
          <GuestList
            adultGuest={adultGuest}
            setAdultGuest={setAdultGuest}
            childrenGuest={childrenGuest}
            setChildrenGuest={setChildrenGuest}
            infantGuest={infantGuest}
            setInfantGuest={setInfantGuest}
            totalGuest={totalGuest}
          />
          <Divider />
          {/* <LoginToBook /> */}
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            {auth?.accessToken ? (
              <Stack spacing={6}>
                <BookingPolicy />
                <Button
                  w={'full'}
                  color={'teal.400'}
                  onClick={submitBookingForm}
                  disabled={disableSubmitBtn}
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
        </Stack>
      </Flex>
      <Flex flex={1} p={8}>
        <PropertyCard day={day} setDay={setDay} />
      </Flex>
    </Stack>
  );
}
