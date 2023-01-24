import React from 'react';
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Skeleton,
  HStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom';

function TransactionCard() {
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const params = useParams();

  const getData = async () => {
    try {
      const res = await axios.get(`transaction/${params.transactionId}`);
      setData(res.data);
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [isloading]);

  return isloading ? (
    <Skeleton isLoaded={true}> </Skeleton>
  ) : (
    <Skeleton isLoaded={!isloading}>
      <Card maxW='xl'>
        <CardBody>
          <Text>Booking ID</Text>
          <Stack mt='6' spacing='3'>
            <Heading size='lg'>{data.id}</Heading>

            <Divider />

            <Heading size='md'>Booking Details</Heading>

            <Divider />
            <HStack justifyContent={'space-between'}>
              <Heading size='md'>Guest</Heading>
            </HStack>
          </Stack>
        </CardBody>
      </Card>
    </Skeleton>
  );
}

export default TransactionCard;
