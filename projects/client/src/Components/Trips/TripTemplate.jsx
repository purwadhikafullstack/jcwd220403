import {
  Box,
  Flex,
  GridItem,
  Image,
  chakra,
  Text,
  Button,
  ButtonGroup,
  Badge,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import GiveReview from './GiveReview';
import SeeReview from './SeeReview';

function Trip({ heading, date, image, tenant, review, status }) {
  return (
    <Flex flexDir='row' gap={5} alignItems='center'>
      <Box h='100%' w='50%'>
        <Image
          minH='100px'
          minW='100px'
          objectFit={'cover'}
          src={'http://localhost:2000/roomPicture/' + image}
          borderRadius='5px'
        ></Image>
      </Box>
      <GridItem>
        <Box>
          <chakra.h3 fontSize='xl' fontWeight='600'>
            {heading}
          </chakra.h3>
        </Box>
        <Text fontSize={'14px'}>Hosted by {tenant}</Text>
        <Text fontSize={'11px'}>{date}</Text>
        {status === 'Menunggu Pembayaran' ||
        status === 'Menunggu Konfirmasi Pembayaran' ? (
          <Stack>
            <Badge fontSize={'9px'} colorScheme={'green'}>
              {status}
            </Badge>
            <ButtonGroup>
              <Button size={'xs'} colorScheme={'teal'}>
                Lanjutkan transaksi
              </Button>
              <Button size={'xs'} colorScheme={'gray'}>
                Cancel
              </Button>
            </ButtonGroup>
          </Stack>
        ) : review ? (
          <SeeReview property={heading} review={review} />
        ) : (
          <GiveReview property={heading} />
        )}
      </GridItem>
    </Flex>
  );
}

export default Trip;
