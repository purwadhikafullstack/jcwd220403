import {
  Box,
  chakra,
  GridItem,
  Grid,
  Flex,
  Heading,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import React from 'react';

function Ongoing() {
  return (
    <Box mb={12}>
      <chakra.h3 fontSize='xl' fontWeight='600' mb={5}>
        {' '}
        Ongoing
      </chakra.h3>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={4}
        borderRadius='10px'
        outline='1px solid lightgray'
        alignItems='center'
      >
        <GridItem colSpan={1}>
          <Flex m={10} flexDir='column' gap='10px'>
            <Heading>No trips booked...yet!</Heading>
            <Text>
              Time to dust off your bags and start planning your next adventure
            </Text>
            <Button colorScheme='orange' width='70%' mt={5}>
              Start Searching
            </Button>
          </Flex>
        </GridItem>
        <GridItem w='100%' h='100%'>
          <Box
            w='100%'
            h='100%'
            overflow='hidden'
            borderTopRightRadius='10px'
            borderBottomRightRadius='10px'
          >
            <Image
              h='100%'
              src='https://images.unsplash.com/photo-1674676618129-fcd0b0dd731b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&h=1000&q=80'
            ></Image>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Ongoing;
