import React, { useState } from 'react';
import {
  Heading,
  HStack,
  Text,
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
  FormControl,
  FormLabel,
  Input,
  Box,
  VStack,
  Stack,
} from '@chakra-ui/react';

function GuestList() {
  const [guest, setGuest] = useState(1);
  return (
    <div>
      <HStack justifyContent={'space-between'}>
        <Heading size={'md'}>Guests</Heading>
        <Popover>
          <PopoverTrigger>
            <Button>Edit</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Guests</PopoverHeader>
            <PopoverBody>
              <FormControl>
                <Stack>
                  <HStack className='adults' justifyContent={'space-between'}>
                    <FormLabel>Adults</FormLabel>
                    <HStack>
                      <Button>-</Button>
                      <Text>{guest}</Text>
                      <Button>+</Button>
                    </HStack>
                  </HStack>
                  <HStack className='children' justifyContent={'space-between'}>
                    <FormLabel>Children</FormLabel>
                    <HStack>
                      <Button>-</Button>
                      <Text>{guest}</Text>
                      <Button>+</Button>
                    </HStack>
                  </HStack>
                  <HStack className='infant' justifyContent={'space-between'}>
                    <FormLabel>Infant</FormLabel>
                    <HStack>
                      <Button>-</Button>
                      <Text>{guest}</Text>
                      <Button>+</Button>
                    </HStack>
                  </HStack>
                </Stack>
              </FormControl>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      {guest > 1 ? <Text>{guest} guests</Text> : <Text>{guest} guest</Text>}
    </div>
  );
}

export default GuestList;
