import { Button, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import React from 'react';

function OngoingList() {
  return (
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
    ></Grid>
  );
}

export default OngoingList;
