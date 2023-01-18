import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import empty from '../../Assets/empty.jpg';

const EmptyDashboard = () => {
  return (
    <Box>
      <Box width='500px' margin='auto'>
        <Image src={empty} />
        <Text textAlign='center'>Empty dashboard</Text>
      </Box>
    </Box>
  );
};

export default EmptyDashboard;
