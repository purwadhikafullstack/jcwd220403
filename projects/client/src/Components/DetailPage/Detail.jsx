import {
  Flex,
  Center,
  useMediaQuery,
  Box,
  Heading,
  Text,
  Image,
  Grid,
  GridItem,
  Button,
  HStack,
  Avatar,
  Divider,
  SkeletonText,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import useSearch from '../../hooks/useSeacrh';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function DetailPage() {
  const [isMobile] = useMediaQuery('(max-width: 481px)');
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const params = useParams();
  const { setSearch, search } = useSearch();
  const [lokasi, setLokasi] = useState('');

  const [state, setState] = useState([
    {
      startDate: search.state ? search.state[0].startDate : new Date(),
      endDate: search.state ? search.state[0].endDate : new Date(),
      key: 'selection',
    },
  ]);

  const getData = async () => {
    try {
      const res = await axios.post(
        `/detail/property/${params.id}`,
        search ? search : { state, lokasi }
      );
      res.data.rooms.forEach((room) => {
        if (room.picture) {
          room.images.push({ picture: room.picture });
        }
      });
      setData(res.data);
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <Button
        bg='white'
        onClick={onClick}
        style={{
          position: 'absolute',
          right: '20px',
          top: 'calc(50% - 20px)',
          color: 'black',
          borderRadius: '100%',
          width: '20px',
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FaArrowRight />
      </Button>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <Button
        bg='white'
        onClick={onClick}
        style={{
          position: 'absolute',
          left: '5px',
          top: 'calc(50% - 20px)',
          color: 'black',
          borderRadius: '100%',
          width: '20px',
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          opacity: 1,
        }}
      >
        <FaArrowLeft />
      </Button>
    );
  };

  return (
    <>
      {isMobile ? (
        <Center>
          <Box w='80vw' pb='10'>
            <Skeleton isLoaded={!isloading}>
              <Heading fontSize='2xl'>{data?.name}</Heading>
              <Text fontWeight='bold' fontSize='small'>
                {data?.category?.city}, {data?.category?.country}
              </Text>
            </Skeleton>
            <Skeleton isLoaded={!isloading}>
              <Image
                src={
                  process.env.REACT_APP_URL_PUBLIC +
                  'propertyPicture/' +
                  data?.picture
                }
              />
            </Skeleton>
            <HStack mt='8' mb='4' w='80vw'>
              <SkeletonCircle mr='4' size='10' isLoaded={!isloading}>
                <Avatar
                  size='md'
                  src={
                    process.env.REACT_APP_URL_PUBLIC +
                    'profilePicture/' +
                    data?.tenant?.user.photo
                  }
                />
              </SkeletonCircle>
              <Skeleton isLoaded={!isloading}>
                <Box>
                  <Heading mt='2' fontSize='xl'>
                    Tuan Rumah : {data?.tenant?.user.fullName}
                  </Heading>
                  <Text fontSize='sm' color='gray.600'>
                    {data?.rooms?.length} Room
                  </Text>
                </Box>
              </Skeleton>
            </HStack>
            <Divider />
            <Skeleton isLoaded={!isloading}>
              <Text mt='4' fontWeight='bold'>
                Description
              </Text>
            </Skeleton>
            <SkeletonText isLoaded={!isloading}>
              <Text mb='4' textAlign='justify' color='gray.600'>
                {data?.description}
              </Text>
            </SkeletonText>
            <Divider />
            <Skeleton mt='4' isLoaded={!isloading}>
              <Box w='30w' mb='4'>
                <Center>
                  <Box border='1px' borderRadius='xl' overflow='hidden'>
                    <DateRange
                      fixedHeight={true}
                      rangeColors={['#FE9900']}
                      editableDateInputs={true}
                      onChange={(item) => setState([item.selection])}
                      minDate={addDays(new Date(), 0)}
                      maxDate={addDays(new Date(), 60)}
                      moveRangeOnFirstSelection={false}
                      ranges={state}
                      showMonthAndYearPickers={false}
                    />
                  </Box>
                </Center>
                <Button
                  w='full'
                  mt='2'
                  colorScheme='orange'
                  isDisabled={state === search.state}
                  onClick={() => {
                    setSearch({ lokasi, state });
                    setIsloading(true);
                  }}
                >
                  Change Date
                </Button>
              </Box>
            </Skeleton>

            <Divider />
            <Skeleton isLoaded={!isloading}>
              <Text mt='4' fontWeight='bold'>
                Tipe Kamar yang Tersedia di {data?.name}
              </Text>
            </Skeleton>
            <Box w='80w'>
              {data?.rooms?.map((item, i) => {
                return (
                  <Skeleton isLoaded={!isloading}>
                    <Flex
                      key={i}
                      mt='4'
                      borderRadius='md'
                      overflow='hidden'
                      boxShadow='md'
                    >
                      <Box m='2' p='2' w='80vw' borderRadius='2xl'>
                        <Slider
                        
                          infinite={true}
                          speed={500}
                          slidesToShow={1}
                          slidesToScroll={1}
                          nextArrow={<NextArrow />}
                          prevArrow={<PrevArrow />}
                        >
                          {item.images &&
                            item.images.map((image, i) => (
                              <Box
                                key={i}
                              >
                                <Image
                                  width="295px"
                                  objectFit='cover'
                                  height="200px"
                                  src={
                                    process.env.REACT_APP_URL_PUBLIC +
                                    'roomPicture/' +
                                    image.picture
                                  }
                                />
                              </Box>
                            ))}
                        </Slider>
                        <Text mb='2' mt='2' fontWeight='bold'>
                          {' '}
                          {item.name}{' '}
                        </Text>
                        <Divider />
                        <Text
                          mb='2'
                          h='15vh'
                          textAlign='justify'
                          overflow='scroll'
                        >
                          {item.description}
                        </Text>
                        <Divider />
                        {item.highSeasons && item.highSeasons.map((season, i) => (
                          <Box>
                            {new Date(season.start_date) <= new Date() && new Date(season.end_date) >= new Date() ?
                              (
                                <Text mb='2' fontWeight='bold' color='orange' fontSize="sm">
                                  Rp{' '}
                                  {new Intl.NumberFormat('en-DE').format(
                                    season.price
                                  )}{' '}
                                  / malam
                                </Text>
                              ) : null}
                          </Box>
                        ))}
                        {item.highSeasons &&
                          item.highSeasons.filter(
                            (room) =>
                              new Date(room.start_date) <= new Date() &&
                              new Date(room.end_date) >= new Date()
                          ).length === 0 ? (
                          <Text mb='2' fontWeight='bold' color='orange' fontSize="sm">
                            Rp{' '}
                            {new Intl.NumberFormat('en-DE').format(
                              item.price
                            )}{' '}
                            / malam
                          </Text>
                        ) : null}
                        <Button
                          mt='2'
                          colorScheme='orange'
                          isDisabled={
                            item.transactions.length !== 0 ||
                            item.unavailableDates.length !== 0
                          }
                          onClick={() =>
                            navigate(`/book/${data.id}/${i}/${item.id}`)
                          }
                        >
                          Pesan sekarang
                        </Button>
                      </Box>
                    </Flex>
                  </Skeleton>
                );
              })}
            </Box>
          </Box>
        </Center>
      ) : (
        <Center>
          <Box w='80vw' pb='10'>
            <Skeleton isLoaded={!isloading}>
              <Heading fontSize='3xl'>{data?.name}</Heading>
              <Text fontWeight='bold' fontSize='sm'>
                {data?.category?.city}, {data?.category?.country}
              </Text>
            </Skeleton>

            <Grid
              mt='4'
              overflow='hidden'
              borderRadius='2xl'
              templateRows='repeat(2, 1fr)'
              templateColumns='repeat(4, 1fr)'
              gap={2}
            >
              <GridItem rowSpan={2} colSpan={2}>
                <Skeleton isLoaded={!isloading}>
                  <Image
                    src={
                      process.env.REACT_APP_URL_PUBLIC +
                      'propertyPicture/' +
                      data?.picture
                    }
                  />
                </Skeleton>
              </GridItem>
              <GridItem colSpan={1}>
                <Skeleton isLoaded={!isloading}>
                  {' '}
                  <Image
                    src={
                      process.env.REACT_APP_URL_PUBLIC +
                      'propertyPicture/' +
                      data?.picture
                    }
                  />
                </Skeleton>
              </GridItem>
              <GridItem colSpan={1}>
                <Skeleton isLoaded={!isloading}>
                  {' '}
                  <Image
                    src={
                      process.env.REACT_APP_URL_PUBLIC +
                      'propertyPicture/' +
                      data?.picture
                    }
                  />
                </Skeleton>
              </GridItem>
              <GridItem colSpan={1}>
                <Skeleton isLoaded={!isloading}>
                  {' '}
                  <Image
                    src={
                      process.env.REACT_APP_URL_PUBLIC +
                      'propertyPicture/' +
                      data?.picture
                    }
                  />
                </Skeleton>
              </GridItem>
              <GridItem colSpan={1}>
                <Skeleton isLoaded={!isloading}>
                  {' '}
                  <Image
                    src={
                      process.env.REACT_APP_URL_PUBLIC +
                      'propertyPicture/' +
                      data?.picture
                    }
                  />
                </Skeleton>
              </GridItem>
              {isloading ? null : (
                <Button
                  border='1px'
                  borderColor='black'
                  position='absolute'
                  mt='2'
                  ml='2'
                  size='sm'
                >
                  Tampilkan Semua Foto
                </Button>
              )}
            </Grid>

            <HStack mt='8' mb='4' w='40vw'>
              <SkeletonCircle mr='4' size='10' isLoaded={!isloading}>
                <Avatar
                  size='md'
                  src={
                    process.env.REACT_APP_URL_PUBLIC +
                    'profilePicture/' +
                    data?.tenant?.user.photo
                  }
                />
              </SkeletonCircle>
              <Skeleton isLoaded={!isloading}>
                <Box>
                  <Heading mt='2' fontSize='xl'>
                    Tuan Rumah : {data?.tenant?.user.fullName}
                  </Heading>
                  <Text fontSize='sm' color='gray.600'>
                    {data?.rooms?.length} Room
                  </Text>
                </Box>
              </Skeleton>
            </HStack>
            <Divider />
            <Skeleton isLoaded={!isloading}>
              <Text mt='4' fontWeight='bold'>
                Description
              </Text>
            </Skeleton>
            <SkeletonText isLoaded={!isloading}>
              <Text mb='4' textAlign='justify' color='gray.600'>
                {data?.description}
              </Text>
            </SkeletonText>
            <Divider />
            <Skeleton isLoaded={!isloading}>
              <Text mt='4' fontWeight='bold'>
                Tipe Kamar yang Tersedia di {data?.name}
              </Text>
            </Skeleton>
            <Flex w='80w' justify='space-between'>
              <Box w='50w'>
                {data?.rooms?.map((item, i) => {
                  return (
                    <Skeleton isLoaded={!isloading}>
                      <Flex
                        key={i}
                        mt='4'
                        borderRadius='md'
                        overflow='hidden'
                        boxShadow='md'
                      >
                        <Flex w='15vw'>
                          <Image
                            src={
                              process.env.REACT_APP_URL_PUBLIC +
                              'roomPicture/' +
                              item.picture
                            }
                            boxSize='full'
                            objectFit='cover'
                          />
                        </Flex>
                        <Box m='2' p='2' w='35vw' borderRadius='2xl'>
                          <Flex
                            justify='space-between'
                            overflowWrap='break-word'
                          >
                            <Text mb='2' fontWeight='bold'>
                              {item.name}
                            </Text>
                            {item.highSeasons && item.highSeasons.map((season, i) => (
                              <Box>
                                {new Date(season.start_date) <= new Date() && new Date(season.end_date) >= new Date() ?
                                  (
                                    <Text mb='2' fontWeight='bold' color='orange'>
                                      Rp{' '}
                                      {new Intl.NumberFormat('en-DE').format(
                                        season.price
                                      )}{' '}
                                      / malam
                                    </Text>
                                  ) : null}
                              </Box>
                            ))}
                            {item.highSeasons &&
                              item.highSeasons.filter(
                                (room) =>
                                  new Date(room.start_date) <= new Date() &&
                                  new Date(room.end_date) >= new Date()
                              ).length === 0 ? (
                              <Text mb='2' fontWeight='bold' color='orange'>
                                Rp{' '}
                                {new Intl.NumberFormat('en-DE').format(
                                  item.price
                                )}{' '}
                                / malam
                              </Text>
                            ) : null}
                          </Flex>
                          <Divider />
                          <Text h='15vh' textAlign='justify' overflow='scroll'>
                            {item.description}
                          </Text>
                          <Divider />
                          <Button
                            mt='2'
                            colorScheme='orange'
                            onClick={() =>
                              navigate(`/book/${data.id}/${i}/${item.id}`)
                            }
                            isDisabled={
                              item.transactions.length !== 0 ||
                              item.unavailableDates.length !== 0
                            }
                          >
                            Pesan sekarang
                          </Button>
                        </Box>
                      </Flex>
                    </Skeleton>
                  );
                })}
              </Box>
              <Skeleton mt='4' isLoaded={!isloading}>
                <Box w='30w'>
                  <Center>
                    <Box border='1px' borderRadius='xl' overflow='hidden'>
                      <DateRange
                        fixedHeight={true}
                        rangeColors={['#FE9900']}
                        editableDateInputs={true}
                        onChange={(item) => setState([item.selection])}
                        minDate={addDays(new Date(), 0)}
                        maxDate={addDays(new Date(), 60)}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                        showMonthAndYearPickers={false}
                      />
                    </Box>
                  </Center>
                  <Button
                    w='full'
                    mt='2'
                    colorScheme='orange'
                    isDisabled={state === search.state}
                    onClick={() => {
                      setSearch({ lokasi, state });
                      setIsloading(true);
                    }}
                  >
                    Change Date
                  </Button>
                </Box>
              </Skeleton>
            </Flex>
          </Box>
        </Center>
      )}
    </>
  );
}

export default DetailPage;
