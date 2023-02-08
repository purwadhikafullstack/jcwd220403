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
import { useNavigate } from 'react-router-dom';
import ConfirmCancel from './ConfirmCancel';

function Trip({
  heading,
  date,
  image,
  tenant,
  review,
  status,
  transactionId,
  paymentId,
  paymentmethodId,
  passCheckOut,
}) {
  const navigate = useNavigate();

  return (
    <Flex flexDir='row' gap={5} alignItems='center'>
      <Box h='100%' w='100%'>
        <Image
          minH='100%'
          minW='100%'
          objectFit={'cover'}
          src={process.env.REACT_APP_URL_PUBLIC + 'roomPicture/' + image}
          borderRadius='5px'
        ></Image>
      </Box>
      <GridItem>
        <chakra.h3 fontSize='xl' fontWeight='600'>
          {heading}
        </chakra.h3>
        <Text fontSize={'14px'}>Hosted by {tenant}</Text>
        <Text fontSize={'11px'}>{date}</Text>
        {status === 'Dibatalkan' ? (
          <Badge fontSize={'9px'} colorScheme={'red'}>
            Declined by Tenant
          </Badge>
        ) : status === 'Dibatalkan User' ? (
          <Badge fontSize={'9px'} colorScheme={'red'}>
            Cancelled
          </Badge>
        ) : status === 'Menunggu Pembayaran' ||
          status === 'Menunggu Konfirmasi Pembayaran' ? (
          <Stack>
            <Badge fontSize={'9px'} colorScheme={'orange'} borderRadius='4px'>
              {status}
            </Badge>
            <ButtonGroup>
              <Button
                size={'xs'}
                colorScheme={'teal'}
                onClick={() =>
                  navigate(
                    `/payment/${transactionId}/${paymentId}/${paymentmethodId}`
                  )
                }
              >
                Continue
              </Button>
              <ConfirmCancel trip={transactionId} />
            </ButtonGroup>
          </Stack>
        ) : review ? (
          <SeeReview property={heading} review={review} />
        ) : (
          <GiveReview
            property={heading}
            id={transactionId}
            passCheckOut={passCheckOut}
          />
        )}
      </GridItem>
    </Flex>
  );
}

export default Trip;
