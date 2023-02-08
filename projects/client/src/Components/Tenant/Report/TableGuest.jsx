import {
    Text,
    Center,
    useMediaQuery,
    Box,
    Flex,
    Icon,
    useDisclosure,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    TagRightIcon,
    InputGroup,
    InputLeftElement,
    Input,
    Select,
    InputRightElement,
    Circle,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Button,
    PopoverFooter,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
  import useAuth from "../../../hooks/useAuth";
  import { IoCaretUp, IoCaretDown, IoCloseOutline, IoCalendarOutline, IoPeopleOutline } from "react-icons/io5";
  import { SearchIcon } from "@chakra-ui/icons";
  import { DateRange } from "react-date-range";
  import { BsSortAlphaDownAlt, BsSortAlphaUpAlt } from "react-icons/bs";
  import { BiSort } from "react-icons/bi";
  
  function TableGuest() {
    const [isloading, setIsloading] = useState(true);
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { auth } = useAuth();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("Count");
    const [order_direction, setOrder_direction] = useState("DESC");
    const [limit, setLimit] = useState(10);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState("");
    const [show, setShow] = useState(false)
    const [pages, setPages] = useState([])
    const axiosPrivate = useAxiosPrivate();
    const [isMobile] = useMediaQuery("(max-width: 481px)");
    const head = [
      { label: "Nama", name: "fullName" },
      { label: "Kunjungan", name: "Count" },
      { label: "Total Transaksi", name: "total_amount" }
    ];
  
    const [state, setState] = useState([
      {
        startDate: search.state ? search.state[0].startDate : new Date(),
        endDate: search.state ? search.state[0].endDate : new Date(),
        key: 'selection',
      },
    ]);
  
    const getData = async () => {
      try {
        const res = await axiosPrivate.get(`/report/guest?tenantId=${auth.tenantId}&search=${search}&order=${order}&order_direction=${order_direction}&limit=${limit}&start=${start}&end=${end}&page=${page}`
        );
        setData(res.data.data);
        setRows(res.data.totalRows)
        const allpage = []
        for (let i = 1; i <= res.data.totalPage; i++) {
          allpage.push(i)
        }
        setPages(allpage)
        setIsloading(false);
      } catch (err) {
        console.log(err);
      }
    };
  
    const selectDate = () => {
      setStart(state[0].startDate)
      setEnd(state[0].endDate)
      setPage(1)
      setShow(true)
      onClose()
    }
  
    const deleteDate = () => {
      setStart("")
      setEnd("")
      setShow(false)
    }
  
    const ordering = (a, b ) => {
      if (b === "ASC") {
          setOrder(a)
          setOrder_direction("DESC");
      } else if (b === "DESC") {
          setOrder(a)
          setOrder_direction("ASC");
      }
    };
  
    useEffect(() => {
      getData();
    }, [order_direction, order, search, limit, start, end, page]);
  
    return (
      <>
        <Center>
          {isMobile ? (
            <Box w="90vw" mt="2" mb="8" p="2" >
                  <Flex Flex bgColor="white" mt="4" p="4" align="center" h="full" >
                      <Circle boxShadow="lg" size="16" bgColor="orange.100">
                          <Icon w={8} h={8} as={IoPeopleOutline}/>
                      </Circle>
                      <Box ml="4">
                          <Text fontSize="small" color="gray.500" >Jumlah Tamu</Text>
                          <Text color="orange" fontSize="md" fontWeight="bold" >
                          { rows} Orang
                          </Text>
                          <Popover
                          isOpen={isOpen}
                          onOpen={onOpen}
                          onClose={onClose}
                      >
                          <PopoverTrigger>
                          <Flex fontSize="xx-small" align="center" >
                          { !show ? <Icon ww={3} h={3} as={IoCalendarOutline} mr="2" /> : null}
  
                              { !show ? 'Sesuaikan Tanggal' : new Date(state[0]['startDate']).toLocaleString('en', {
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
                          { show ? <Icon w={3} h={3} as={IoCloseOutline} ml="2"  onClick={deleteDate}/> : null}
                          </Flex>
  
                          </PopoverTrigger> 
                          <Portal>
                              <PopoverContent w="full">
                              <PopoverArrow />
                              <PopoverBody>
                                  <Center>
                                  <Box border='1px' borderRadius='xl' borderColor="gray.100" overflow="hidden">
                                      <DateRange
                                      fixedHeight={true}
                                      rangeColors={['#FE9900']}
                                      editableDateInputs={true}
                                      onChange={(item) => setState([item.selection])}
                                      moveRangeOnFirstSelection={false}
                                      ranges={state}
                                      showMonthAndYearPickers={false}
                                      />
                                  </Box>
                                  </Center>
                              </PopoverBody>
                              <PopoverFooter >
                                  <Button size="sm" onClick={selectDate} colorScheme="orange">Select Date</Button>
                              </PopoverFooter>
                              </PopoverContent>
                          </Portal>
                      </Popover>
                      </Box>                    
                  </Flex>
                  <Flex m="4" w="80vw" justify="space-evenly" align="center">
                  <InputGroup bgColor="gray.50" boxShadow="base" w="70%" size="sm"  borderRadius="3xl" overflow="hidden">
                          <InputLeftElement
                          pointerEvents='none'
                          children={<SearchIcon />}
                          />
                          <Input borderRadius="3xl" placeholder='Search User' value={search} onChange={(e) => {setSearch(e.target.value); setPage(1)}} fontSize="small" type="text" />
                          { search ? <InputRightElement onClick={() => setSearch('')} children={<Icon cursor="pointer" as={IoCloseOutline}/>}/> : null}
                      </InputGroup>
                      <Menu>
                          <MenuButton >
                              <Icon as={BiSort} />
                          </MenuButton>
                          <MenuList>
                              {head.map(item => {
                                  return (
                                  <MenuItem onClick={() => {setOrder(item.name); setPage(1)}}>{item.label}</MenuItem>
                                  )
                              })}
                          </MenuList>
                      </Menu>
                      <Menu>
                          <MenuButton fontSize="x-small" alignSelf="center" >
                              {limit}
                              <Icon as={IoCaretDown} />
                          </MenuButton>
                          <MenuList fontSize="x-small" >
                              <MenuItem onClick={() => {setLimit(2); setPage(1)}}>2</MenuItem>
                              <MenuItem onClick={() => {setLimit(10); setPage(1)}}>10</MenuItem>
                              <MenuItem onClick={() => {setLimit(100); setPage(1)}}>100</MenuItem>
                          </MenuList>
                      </Menu>
                  </Flex>
                  <TableContainer w="88vw">
                      <Table variant='simple'>
                          <Thead>
                          <Tr>
                              <Th>
                                  Detail Tamu
                                  { order === "Count" ? null : <TagRightIcon as={ order_direction === "ASC" ? BsSortAlphaUpAlt : BsSortAlphaDownAlt} onClick={() => setOrder_direction(order_direction === "ASC" ? "DESC" : "ASC")}/>}
                              </Th>
                              <Th>
                                  Kunjungan
                                  { order !== "Count" ? null : <TagRightIcon as={ order_direction === "ASC" ? BsSortAlphaUpAlt : BsSortAlphaDownAlt} onClick={() => setOrder_direction(order_direction === "ASC" ? "DESC" : "ASC")}/>}
                              </Th>
                          </Tr>
                          </Thead>
                          <Tbody fontFamily="serif" >
                          {data.map(item => {
                              return(
                                <Tr>
                                    <Td>
                                        <Flex align="center" >
                                            <Avatar size="sm" mr="4" src={process.env.REACT_APP_URL_PUBLIC + 'profilePicture/' + item.user.photo} />
                                            <Box>
                                                <Text fontSize="sm">{item.user.fullName}</Text>
                                                <Text fontSize="xx-small">{ new Intl.NumberFormat('IND', {style: 'currency', currency: 'IDR'}).format(item.total_amount)}</Text>
                                            </Box>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric fontSize="x-small" >
                                        <Text fontSize="sm">{item.Count}</Text>
                                </Td>
                                </Tr>
                              )
                          })}
                          </Tbody>
                      </Table>
                  </TableContainer>
                  <Flex w="full" justify="center" align="center">
                  {pages.length === 1 ? null : pages.map(item => {
                      return (
                          <Circle bgColor={page === item ? "orange" : "gray.100"} onClick={() => setPage(item)} cursor="pointer" boxShadow="base" m="0.5" fontSize="small" justify="center" w="7" p="1" >
                              {item}
                          </Circle>
                      )
                  })}
                </Flex>
              </Box>
          ) : (
            <Box >
                  <Flex h="15vh" p="4" m="4" borderBottom="1px" borderColor="gray.100" justify="space-between" align="center">
                      <Flex bgColor="white" mt="2" p="4" align="center" h="full" w="30%"  >
                          <Circle boxShadow="lg" size="16" bgColor="orange.100">
                              <Icon w={8} h={8} as={IoPeopleOutline}/>
                          </Circle>
                          <Box ml="4">
                              <Text fontSize="small" color="gray.500" >Jumlah Tamu</Text>
                              <Text color="orange" fontSize="md" fontWeight="bold" >
                              {rows} Orang
                              </Text>
                          </Box>
                      </Flex>
                      <Popover
                              isOpen={isOpen}
                              onOpen={onOpen}
                              onClose={onClose}
                      >
                          <PopoverTrigger>
                              <Flex boxShadow="base" cursor="pointer" justify="center" fontSize="sm" border="1px" borderColor="gray.100" align="center" bgColor="gray.50" p="2" borderRadius="2xl" w="25%" h="8">
                                  { !show ? <Icon w={5} h={5} m="2" as={IoCalendarOutline} /> : null}
                                  <Text>
                                      { !show ? 'Cari Tanggal ..' : new Date(state[0]['startDate']).toLocaleString('en', {
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
                                  { show ? <Icon w={5} h={5} m="2" as={IoCloseOutline}  onClick={deleteDate}/> : null}
                              </Flex>
                          </PopoverTrigger>
                          <Portal>
                              <PopoverContent w="full">
                              <PopoverArrow />
                              <PopoverBody>
                                  <Center>
                                  <Box border='1px' borderRadius='xl' borderColor="gray.100" overflow="hidden">
                                      <DateRange
                                      fixedHeight={true}
                                      rangeColors={['#FE9900']}
                                      editableDateInputs={true}
                                      onChange={(item) => setState([item.selection])}
                                      moveRangeOnFirstSelection={false}
                                      ranges={state}
                                      showMonthAndYearPickers={false}
                                      />
                                  </Box>
                                  </Center>
                              </PopoverBody>
                              <PopoverFooter >
                                  <Button size="sm" onClick={() => selectDate()} colorScheme="orange">Select Date</Button>
                              </PopoverFooter>
                              </PopoverContent>
                          </Portal>
                      </Popover>
                   
                  </Flex>
                  <Flex m="4" justify="space-between" align="center" >
  
                      <Flex justify="end" w="full">
                          <InputGroup bgColor="gray.50" boxShadow="base" w="20%" size="sm"  borderRadius="3xl" overflow="hidden">
                              <InputLeftElement
                              pointerEvents='none'
                              children={<SearchIcon />}
                              />
                              <Input borderRadius="3xl" placeholder='Search User' value={search} onChange={(e) => {setSearch(e.target.value); setPage(1)}} fontSize="small" type="text" />
                              { search ? <InputRightElement onClick={() => setSearch('')} children={<Icon cursor="pointer" as={IoCloseOutline}/>}/> : null}
                          </InputGroup>
                          <Select boxShadow="base" bgColor="gray.50" ml="3" onChange={(e) => {setLimit(e.target.value); setPage(1)}} defaultValue={10} size="sm" w="5vw" borderRadius="2xl">
                              <option value={2}>2</option>
                              <option value={10}>10</option>
                              <option value={100}>100</option>
                          </Select>
                      </Flex>
                  </Flex>
                <TableContainer w="75vw" m="4" >
                  <Table variant="striped">
                    <Thead>
                      <Tr>
                          {head.map(item => {
                              return (
                                  <Th textAlign="center" cursor="pointer" onClick={() => ordering(item.name, order_direction)}>
                                      {item.label}
                                      { order === item.name ? <TagRightIcon as={ order_direction === 'ASC' ? IoCaretUp : IoCaretDown}/> : null}
                                  </Th>
                              )
                          })}
                      </Tr>
                    </Thead>
                    <Tbody fontFamily="serif" >
                      {data.map((item) => {
                        return (
                          <Tr>
                            <Td>
                                <Flex align="center" >
                                    <Avatar size="sm" mr="4" src={process.env.REACT_APP_URL_PUBLIC + 'profilePicture/' + item.user.photo} />
                                    <Text fontSize="sm">{item.user.fullName}</Text>
                                </Flex>
                            </Td>
                            <Td isNumeric>{item.Count}</Td>
                            <Td isNumeric >{ new Intl.NumberFormat('IND', {style: 'currency', currency: 'IDR'}).format(item.total_amount)}</Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex w="full" justify="center" align="center">
                  {pages.length === 1 ? null : pages.map(item => {
                      return (
                          <Circle bgColor={page === item ? "orange" : "gray.100"} onClick={() => setPage(item)} cursor="pointer" boxShadow="base" m="0.5" fontSize="small" justify="center" w="7" p="1" >
                              {item}
                          </Circle>
                      )
                  })}
                </Flex>
  
            </Box>
          )}
        </Center>
      </>
    );
  }
  
  export default TableGuest;
  