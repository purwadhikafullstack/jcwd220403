import {
  Heading,
  Select,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import Transfer from './Transfer/Transfer';
import Credit from './Credit/Credit';
import Indomaret from './ConvenienceStores/Indomaret';
import Alfamart from './ConvenienceStores/Alfamart';

function PaymentMethods({ data }) {
  const [choosenOption, setChoosenOption] = useState('transfer');
  return (
    <Stack gap='20px'>
      <Heading size='md'>Payment Method</Heading>
      <Select
        height={'60px'}
        placeholder='Select payment method'
        defaultValue={choosenOption}
        onChange={(option) => setChoosenOption(option.target.value)}
      >
        <option value='transfer'>Bank Transfer</option>
        <option value='credit'>Credit/Debit Card</option>
        <option value='indomaret'>Indomaret</option>
        <option value='alfamart'>Alfamart</option>
      </Select>

      {choosenOption === '' && (
        <Alert
          status='info'
          variant='subtle'
          color={'blue'}
          borderRadius={10}
          height='90px'
        >
          <AlertIcon />
          <AlertDescription>Select your payment method</AlertDescription>
        </Alert>
      )}
      {choosenOption === 'credit' && <Credit />}
      {choosenOption === 'transfer' && <Transfer data={data} />}
      {choosenOption === 'indomaret' && <Indomaret />}
      {choosenOption === 'alfamart' && <Alfamart />}
    </Stack>
  );
}

export default PaymentMethods;
