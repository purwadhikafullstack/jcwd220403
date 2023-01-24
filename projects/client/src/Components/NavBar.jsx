import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Menu,
  MenuButton,
  Tag,
  Avatar,
  MenuList,
  MenuItem,
  Icon,
  MenuDivider,
  useBreakpointValue,
  useMediaQuery,
  IconButton,
  Flex,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  List,
  ListItem,
  Divider,
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../Assets/Logo.png';
import LogoOnly from '../Assets/Logo_only.png';
//import component
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import axios from '../api/axios';

const NavBar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lokasi, setLokasi] = useState('');
  const [alllokasi, setAllokasi] = useState([]);
  const [filterlok, setFilterlok] = useState([]);
  const lok = useRef('');

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const getLokasi = async () => {
    try {
      const res = await axios.get('/category');
      setAllokasi(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchlok = () => {
    const result = alllokasi.filter((name) =>
      name.city.toLowerCase().includes(lok.current.value.toLowerCase())
    );
    setFilterlok(result);
    if (lok.current.value.length === 0) {
      setFilterlok([]);
    }
  };

  useEffect(() => {
    getLokasi();
  }, []);

  const signOut = async () => {
    await logout();
    navigate('/');
  };
  const [isMobile] = useMediaQuery('(max-width: 481px)');
  const displayTablet = useBreakpointValue({
    base: 'none',
    md: 'block',
    lg: 'block',
  });
  const widht = useBreakpointValue({
    base: '100%',
    md: '400px',
  });
  const displayLogoOnly = useBreakpointValue({
    base: 'block',
    md: 'none',
  });
  const logoTabletAndDesktop = useBreakpointValue({
    md: '45%',
    lg: '25%',
  });

  return (
    <Box bg='#ffffff' color='white' p={4} position='sticky' top={0} zIndex={1}>
      <Flex
        maxW={isMobile ? '100%' : '6xl'}
        mx='auto'
        px={4}
        py={2}
        style={{
          ...(isMobile
            ? { borderBottom: 'none' }
            : { borderBottom: '1px solid #181D31' }),
        }}
      >
        <Flex justify='space-evenly' align='center'>
          <Link to={'/'}>
            <Box>
              <Image
                src={Logo}
                width={logoTabletAndDesktop}
                display={displayTablet}
              />
            </Box>
            <Image
              src={LogoOnly}
              width='30px'
              display={displayLogoOnly}
              marginRight='5px'
            />
          </Link>
          <Flex
            justify='space-around'
            align='center'
            color='black'
            w={isMobile ? '70vw' : '30vw'}
            h='50px'
            borderRadius='full'
            cursor='pointer'
            border='1px'
            borderColor='gray.100'
            boxShadow='md'
            mr={isMobile ? 3 : 12}
            onClick={onOpen}
          >
            <Text fontSize={isMobile ? 'x-small' : 'small'}>
              {lokasi ? lokasi : 'Ke mana saja'}
            </Text>
            <Text fontSize={isMobile ? 'xl' : '2xl'}>|</Text>
            <Text fontSize={isMobile ? 'x-small' : 'small'}>
              {lokasi
                ? new Date(state[0]['startDate']).toLocaleString('en', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  }) +
                  ' - ' +
                  new Date(state[0]['endDate']).toLocaleString('en', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'Minggu Manapun'}
            </Text>
            <Button borderRadius='full' size='sm' bgColor='orange'>
              <SearchIcon />
            </Button>
          </Flex>
          {isMobile ? null : (
            <Box>
              <Text
                fontSize='14px'
                fontFamily='Poppins'
                cursor='pointer'
                _hover={{ fontWeight: 'bold' }}
                color='black'
                marginRight='10px'
              >
                {auth?.isTenant === true ? (
                  <Link to={'/tenant/dashboard'}>Switch to hosting</Link>
                ) : (
                  <Link to={'/register-tenant'}>List your property</Link>
                )}
              </Text>
            </Box>
          )}
          <Box marginLeft='auto' display={displayTablet}>
            <Menu>
              <MenuButton w='70px'>
                <Tag
                  bgColor='white'
                  w='40'
                  h='10'
                  borderRadius='full'
                  border='1px'
                  borderColor='gray.300'
                  _hover={{ cursor: 'pointer' }}
                >
                  <Icon as={HamburgerIcon} mr='2' ml='1' />
                  {auth?.userPhoto ? (
                    <Avatar
                      size='sm'
                      name='A'
                      bgColor='#FE9900'
                      src={
                        'http://localhost:2000/profilePicture/' +
                        auth?.userPhoto
                      }
                    />
                  ) : (
                    <Avatar size='sm' name='A' bgColor='#FE9900' />
                  )}
                </Tag>
              </MenuButton>
              {auth?.accessToken ? (
                <MenuList zIndex='3' fontFamily='poppins' color='black'>
                  <MenuItem>
                    <Link to={'/user'}>Profile</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'/trip'}>Trips</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'/review'}>Reviews</Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Link to={'/register-tenant'}>List Your Property</Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>Help</MenuItem>
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </MenuList>
              ) : (
                <MenuList zIndex='3' fontFamily='poppins' color='black'>
                  <MenuItem>
                    <Link to={'/register'}>Register</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'/login'}>Login</Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Link to={'/register-tenant'}>List Your Property</Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>Help</MenuItem>
                </MenuList>
              )}
            </Menu>
          </Box>
          <Box marginLeft='auto' display={displayLogoOnly}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
                borderRadius='full'
                boxShadow='md'
                color='black'
              />
              <MenuList color='black' zIndex='3' fontFamily='poppins'>
                <MenuItem>Register</MenuItem>
                <MenuItem>Login</MenuItem>
                <MenuDivider />
                <MenuItem>List Your Property</MenuItem>
                <MenuDivider />
                <MenuItem>Help</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      {/* search lokasi and date */}
      <Drawer placement='top' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay zIndex={1} />
        <DrawerContent>
          <DrawerBody>
            <Center>
              <Tabs
                isFitted
                variant='soft-rounded'
                colorScheme='orange'
                w={isMobile ? '90vw' : '60vw'}
              >
                <TabList
                  mb='1em'
                  bgColor='gray.100'
                  borderRadius='2xl'
                  overflow='hidden'
                  h='12'
                >
                  <Tab display='block' alignSelf='center'>
                    <Text fontSize='small'>Lokasi</Text>
                    <Text fontSize={isMobile ? 'xx-small' : 'small'}>
                      {lokasi ? lokasi : 'Cari lokasi'}
                    </Text>
                  </Tab>
                  <Tab display='block' alignSelf='center'>
                    <Text fontSize='small'>Tanggal</Text>
                    <Text fontSize={isMobile ? 'xx-small' : 'small'}>
                      {new Date(state[0]['startDate']).toLocaleString('en', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }) +
                        ' - ' +
                        new Date(state[0]['endDate']).toLocaleString('en', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                    </Text>
                  </Tab>
                  <Button bgColor='orange' borderRadius='full' size='lg'>
                    <SearchIcon />
                  </Button>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Center>
                      <Box>
                        <Input
                          defaultValue={lokasi}
                          w={isMobile ? '90vw' : '50vw'}
                          ref={lok}
                          onChange={searchlok}
                          placeholder='Cari Kota'
                          type='text'
                        />
                        {filterlok ? (
                          <List>
                            {filterlok.map((item, index) => {
                              return (
                                <ListItem
                                  p='2'
                                  value={item.city}
                                  key={index}
                                  _hover={{ bgColor: 'gray.100' }}
                                  cursor='pointer'
                                  onClick={() => {
                                    setLokasi(item.city);
                                    setFilterlok([]);
                                  }}
                                >
                                  {item.city}, {item.province}
                                </ListItem>
                              );
                            })}
                          </List>
                        ) : null}
                      </Box>
                    </Center>
                  </TabPanel>
                  <TabPanel>
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
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default NavBar;
