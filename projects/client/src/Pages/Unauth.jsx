import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Unauth() {
  const navigate = useNavigate();
  return (
    <Flex
      justifyContent='center'
      alignItems={'center'}
      backgroundColor='teal'
      h={'100vh'}
    >
      <Box
        width={'50vw'}
        height={'50vh'}
        backgroundColor='teal'
        color={'white'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent='center'
        alignItems={'center'}
      >
        <Heading size={'4xl'}>401</Heading>
        <Text>Unathorized</Text>
        <Text>Stop peeking at other people's business</Text>
        <Button mt={'10px'} colorScheme='orange' onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    </Flex>
  );
}

export default Unauth;
