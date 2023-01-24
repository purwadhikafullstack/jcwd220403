import {
  Heading,
  HStack,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import Calendar from 'react-calendar';
import axios from '../../api/axios';
import '../../Styles/Booking/calendar.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function BookingDate({ inputDate, setInputDate }) {
  const params = useParams();
  const [dateRange, setDateRange] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPastTrasactionDates = async () => {
    try {
      const res = await axios.get(`/transaction/room/${params.roomId}`);
      const data = res.data;
      setDateRange(data);
      console.log(dateRange);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const disableDates = ({ date }) => {
    return dateRange
      .map((d) => date >= new Date(d.checkIn) && date <= new Date(d.checkOut))
      .includes(true);
  };

  useEffect(() => {
    getPastTrasactionDates();
  }, [loading]);

  return (
    <Stack spacing={6}>
      <Heading size={'lg'}>Your Trip</Heading>
      <HStack justifyContent={'space-between'}>
        <Heading size={'md'}>Dates</Heading>
        <Popover>
          <PopoverTrigger>
            <Button>Edit</Button>
          </PopoverTrigger>
          <PopoverContent minW='400px'>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader bg={'teal.50'} paddingLeft='47%' fontWeight={'bold'}>
              Date
            </PopoverHeader>
            <PopoverBody>
              <Calendar
                selectRange={true}
                tileDisabled={disableDates}
                onChange={setInputDate}
                // defaultValue={date}
                minDate={new Date()}
                // showDoubleView={true}
                nextLabel='>'
                nextAriaLabel='Go to next month'
                next2Label={null}
                prevLabel='<'
                prevAriaLabel='Go to prev month'
                prev2Label={null}
              />
            </PopoverBody>
            <PopoverFooter
              border='0'
              display='flex'
              justifyContent={'flex-end'}
              pb={4}
              gap={5}
            >
              <Button
                colorScheme='teal'
                onClick={() => setInputDate(undefined)}
              >
                Clear date
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </HStack>
      <div>
        {!Array.isArray(inputDate) ||
        !inputDate.length ||
        inputDate === undefined ? (
          <p>Add date</p>
        ) : (
          <p>
            <span>Check in:</span> {inputDate[0].toDateString()}
            &nbsp;|&nbsp;
            <span>Check out:</span> {inputDate[1].toDateString()}
          </p>
        )}
      </div>
    </Stack>
  );
}

export default BookingDate;
