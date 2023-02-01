import { Box, Flex, GridItem, Image, chakra, Text } from '@chakra-ui/react';
import React from 'react';

function Trip({ heading, text, image, tenant }) {
  return (
    <Flex flexDir='row' gap={5} alignItems='center'>
      <Box h='100%' w='50%'>
        <Image h='full' src={image} borderRadius='5px'></Image>
      </Box>
      <GridItem>
        <chakra.h3 fontSize='xl' fontWeight='600'>
          {heading}
        </chakra.h3>
        <Text>Hosted by {tenant}</Text>
        <Text>{text}</Text>
      </GridItem>
    </Flex>
  );
}

export default Trip;
