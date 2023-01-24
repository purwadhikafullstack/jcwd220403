import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  useColorModeValue,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../../Styles/verify-tenant/styles.css';

export default function VerifyForm() {
  const [KTPNumber, setKTPNumber] = useState('');
  const [errorMessageForFile, setErrorMessageForFile] = useState('');
  const [errorMessageForID, setErrorMessageForID] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const blobColor = useColorModeValue('teal.50', 'teal.400');

  function handleRedirect() {
    setInterval(() => {
      setSubmitSuccess(true);
    }, 3000);
  }
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 1024 * 1024; //1M
    if (file?.size > MAX_FILE_SIZE) {
      setErrorMessageForFile('file is too large');
      setSelectedFile();
    } else {
      setErrorMessageForFile('');
      setSelectedFile(file);
    }
  };
  const handleIDInput = (e) => {
    const KTPNumberInput = e.target.value;

    if (KTPNumberInput.length !== 16) {
      setErrorMessageForID('Wrong ID format');
      setKTPNumber();
    } else {
      setErrorMessageForID('');
      setKTPNumber(KTPNumberInput);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableSubmitBtn(true);
    try {
      const data = new FormData();
      const userId = auth.userId;
      data.append('userId', userId);
      data.append('KTPNumber', KTPNumber);
      data.append('KTPPhoto', selectedFile);
      const res = axiosPrivate.post('/registerAsTenant', data);
      const toastData = await toast.promise(
        res,
        {
          pending: 'Login on progress...',
          success: {
            render({ data }) {
              return `Success,  ${data.data.message}`;
            },
          },
          error: {
            render({ data }) {
              return `${data.response.data.message}`;
            },
          },
        },
        { position: toast.POSITION.TOP_CENTER }
      );

      setAuth((prev) => {
        return {
          ...prev,
          isTenant: true,
          tenantId: toastData.data.data.tenantId,
        };
      });
      handleRedirect();
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setDisableSubmitBtn(false);
  };

  return submitSuccess ? (
    <Navigate to={'/tenant/add-property'} />
  ) : (
    <Container maxW={'7xl'}>
      <ToastContainer />
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={700}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text as={'span'} color={'orange.400'}>
              Verify your Hosting account
            </Text>
          </Heading>
          <Stack as={'form'} spacing={10}>
            <Stack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Indonesia ID Card Number</FormLabel>
                <Input
                  placeholder='Your ID Number'
                  type={'number'}
                  // value={KTPNumber}
                  onChange={(e) => handleIDInput(e)}
                ></Input>
                <Text color={'red'}>{errorMessageForID}</Text>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>ID Picture</FormLabel>
                <Input
                  className='file-selector-verify'
                  type={'file'}
                  accept={'image/*'}
                  // sx={{
                  //   '::file-selector-button': {
                  //     height: 10,
                  //     padding: 0,
                  //     mr: 4,
                  //     background: 'none',
                  //     border: 'none',
                  //     fontWeight: 'bold',
                  //     cursor: 'pointer',
                  //   },
                  // }}
                  onChange={(e) => handleFileInput(e)}
                ></Input>
                <Text color={'red'}>{errorMessageForFile}</Text>
              </FormControl>
            </Stack>
            <Button
              rounded={'base'}
              fontWeight={'normal'}
              px={6}
              py={6}
              colorScheme={'teal'}
              bg={'teal.400'}
              _hover={{ bg: 'teal.500' }}
              onClick={handleSubmit}
              disabled={disableSubmitBtn}
            >
              Submit
            </Button>
          </Stack>
        </Stack>

        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Blob
            w={'150%'}
            h={'150%'}
            position={'absolute'}
            top={'-20%'}
            left={0}
            zIndex={-1}
            color={blobColor}
          />
          <Box
            position={'relative'}
            height={'300px'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}
          >
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={
                'https://images.unsplash.com/photo-1589129140837-67287c22521b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1530&q=80'
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

export const Blob = (props) => {
  return (
    <Icon
      width={'100%'}
      viewBox='0 0 578 440'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z'
        fill='currentColor'
      />
    </Icon>
  );
};
