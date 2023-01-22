import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingDate from '../../Components/Booking/BookingDate';
import GuestList from '../../Components/Booking/GuestList';
import LoginToBook from '../../Components/Booking/LoginToBook';
import PropertyCard from '../../Components/Booking/PropertyCard';

export default function BookingDetail() {
  const navigate = useNavigate();
  const [adultGuest, setAdultGuest] = useState(1);
  const [childrenGuest, setChildrenGuest] = useState(0);
  const [infantGuest, setInfantGuest] = useState(0);
  const [date, setDate] = useState([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1)), //setting jam
  ]);
  const [day, setDay] = useState(0);

  const numberOfDays = () => {
    let numberOfDaysFormula = Math.floor(
      (date[1].getTime() - date[0].getTime()) / (1000 * 3600 * 24)
    );
    setDay(numberOfDaysFormula);
  };

  const totalGuest = () => {
    const totalGuestList = adultGuest + childrenGuest + infantGuest;
    return totalGuestList;
  };

  useEffect(() => {
    numberOfDays();
  }, [date]);

  return (
    <Stack
      minH={'100vh'}
      direction={{ base: 'column', md: 'row' }}
      justifyContent={'space-between'}
    >
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
          <BookingDate date={date} setDate={setDate} />
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
          <LoginToBook />
        </Stack>
      </Flex>
      <Flex flex={1} p={8}>
        <PropertyCard day={day} setDay={setDay} />
      </Flex>
    </Stack>
  );
}
