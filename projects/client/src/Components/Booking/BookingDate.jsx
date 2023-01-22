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
  PopoverAnchor,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import Calendar from 'react-calendar';
import '../../Styles/Booking/calendar.css';

function BookingDate({ date, setDate }) {
  const tileDisabled = ({ activeStartDate, date, view }) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    return date < startDate;
  };

  return (
    <Stack spacing={6}>
      <Heading size={'lg'}>Your Trip</Heading>
      <HStack justifyContent={'space-between'}>
        <Heading size={'md'}>Dates</Heading>
        <Popover>
          <PopoverTrigger>
            <Button>Edit</Button>
          </PopoverTrigger>
          <PopoverContent minW='700px'>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader bg={'teal.50'} paddingLeft='47%' fontWeight={'bold'}>
              Date
            </PopoverHeader>
            <PopoverBody>
              <Calendar
                selectRange={true}
                tileDisabled={tileDisabled}
                onChange={setDate}
                defaultValue={date}
                showDoubleView={true}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <div>
        {date.length > 0 ? (
          <p>
            <span>Check in:</span> {date[0].toDateString()}
            &nbsp;|&nbsp;
            <span>Check out:</span> {date[1].toDateString()}
          </p>
        ) : (
          <p className='text-center'>
            <span className='bold'>Default selected date:</span>{' '}
            {date.toDateString()}
          </p>
        )}
      </div>
    </Stack>
  );
}

export default BookingDate;
