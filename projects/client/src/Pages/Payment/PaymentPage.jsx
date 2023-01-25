import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import PaymentMethods from '../../Components/Payment/PaymentMethods';
import TransactionCard from '../../Components/Payment/TransactionCard';

export default function SplitScreen() {
  return (
    <Stack
      minH={'100vh'}
      direction={{ base: 'column', md: 'row' }}
      justifyContent={'space-between'}
    >
      <Flex p={8} flex={1} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'xl'}>
          <Heading fontSize={'3xl'}>
            <Text color={'teal.400'} as={'span'}>
              Payment{' '}
            </Text>
          </Heading>
          <PaymentMethods />
          <Button
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Confirm and Pay
          </Button>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <TransactionCard />
      </Flex>
    </Stack>
  );
}
