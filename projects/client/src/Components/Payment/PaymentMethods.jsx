import { Heading, Input, Select, Stack } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

function PaymentMethods() {
  const [coosenOption, setChoosenOption] = useState()
  return (
    <Stack>
      <Heading>Payment Method</Heading>
      <Select placeholder='Select Payment method' size={'xl'} >
        <option value='credit'>Credit/Debit Card</option>
        <option value='transfer'>Bank Transfer</option>
        <option value='indomaret'>Indomaret</option>
        <option value='alfamart'>Alfamart</option>
      </Select>


    </Stack>
  );
}

export default PaymentMethods;
