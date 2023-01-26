import { Box, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React from 'react';

function DestinationAccount({ destinationAccount, setDestinationAccount }) {
  return (
    <Stack gap='20px'>
      <Heading size='md'>Select a destination account</Heading>
      <RadioGroup>
        <Stack>
          <Box
            className='bri'
            border='1px'
            borderColor='gray.200'
            height={20}
            display='flex'
            borderRadius='5px'
            justifyContent='space-between'
            _hover={{ borderColor: 'blue.200' }}
          >
            <Radio
              size='md'
              value='bri'
              marginLeft='20px'
              checked={destinationAccount === 'bri'}
              onChange={(e) => {
                setDestinationAccount(e.target.value);
              }}
            >
              BRI Transfer
            </Radio>
            <Box
              height='75px'
              width='200px'
              display='flex'
              backgroundImage="url('http://4.bp.blogspot.com/-tceaeWKDv00/UNhHf_6AdZI/AAAAAAAAERE/hR3lYKZxCiQ/s1600/Logo+Bank+BRI.jpg')"
              backgroundSize='contain'
              backgroundRepeat='no-repeat'
              backgroundPosition='center'
            ></Box>
          </Box>
          <Box
            className='mandiri'
            border='1px'
            borderColor='gray.200'
            height={20}
            display='flex'
            borderRadius='5px'
            justifyContent='space-between'
            _hover={{ borderColor: 'blue.200' }}
          >
            <Radio
              size='md'
              value='mandiri'
              marginLeft='20px'
              checked={destinationAccount === 'mandiri'}
              onChange={(e) => {
                setDestinationAccount(e.target.value);
              }}
            >
              Mandiri Transfer
            </Radio>
            <Box
              height='75px'
              width='200px'
              display='flex'
              backgroundImage="url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-download.com%2Fwp-content%2Fuploads%2F2016%2F06%2FBank_Mandiri_logo_white_bg.png&f=1&nofb=1&ipt=12706c61fe6b8ea5413efaae823406f0406df5172bb9f8935a90c4f19bdedbf0&ipo=images')"
              backgroundSize='100px'
              backgroundRepeat='no-repeat'
              backgroundPosition='center'
            ></Box>
          </Box>
          <Box
            className='bca'
            border='1px'
            borderColor='gray.200'
            height={20}
            display='flex'
            borderRadius='5px'
            justifyContent='space-between'
            _hover={{ borderColor: 'blue.200' }}
          >
            <Radio
              size='md'
              value='bca'
              marginLeft='20px'
              checked={destinationAccount === 'bca'}
              onChange={(e) => {
                setDestinationAccount(e.target.value);
              }}
            >
              BCA Transfer
            </Radio>
            <Box
              height='75px'
              width='200px'
              display='flex'
              backgroundImage="url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-download.com%2Fwp-content%2Fuploads%2F2017%2F03%2FBCA_logo_Bank_Central_Asia.png&f=1&nofb=1&ipt=35e71041a089b3c4cfa66fd36bafcbf4e733f963b5554c6248903b3b01b483ba&ipo=images')"
              backgroundSize='80px'
              backgroundRepeat='no-repeat'
              backgroundPosition='center'
            ></Box>
          </Box>
          <Box
            className='bni'
            border='1px'
            borderColor='gray.200'
            height={20}
            display='flex'
            borderRadius='5px'
            justifyContent='space-between'
            _hover={{ borderColor: 'blue.200' }}
          >
            <Radio
              size='md'
              value='bni'
              marginLeft='20px'
              checked={destinationAccount === 'bni'}
              onChange={(e) => {
                setDestinationAccount(e.target.value);
              }}
            >
              BNI Transfer
            </Radio>
            <Box
              height='75px'
              width='200px'
              display='flex'
              backgroundImage="url('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-y-qqDgzromg%2FUZrlU5NwDAI%2FAAAAAAAAC08%2FOzk2gFsg5cA%2Fs1600%2FLogo%2BBNI%2B~%2BKuwarasanku%2B(2).jpeg&f=1&nofb=1&ipt=63ba8f014a1461586c6804be5cccb2b16b714b2f5267c1f99088263dbb0f2780&ipo=images')"
              backgroundSize='80px'
              backgroundRepeat='no-repeat'
              backgroundPosition='center'
            ></Box>
          </Box>
        </Stack>
      </RadioGroup>
    </Stack>
  );
}

export default DestinationAccount;
