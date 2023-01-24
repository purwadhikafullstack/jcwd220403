import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
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
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Create Project
            </Button>
            <Button rounded={'full'}>How It Works</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <TransactionCard />
      </Flex>
    </Stack>
  );
}
