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
    TableCaption,
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
    Tag,
    TagLabel,
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
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
  import useAuth from "../../../hooks/useAuth";
  import { IoCaretUp, IoCaretDown, IoCloseOutline, IoCalendarOutline, IoReorderFourOutline } from "react-icons/io5";
  import { GrMoney } from "react-icons/gr";
  import { SearchIcon } from "@chakra-ui/icons";
  import { DateRange } from "react-date-range";
  import { BsSortAlphaDownAlt, BsSortAlphaUpAlt } from "react-icons/bs";
  import { BiSort } from "react-icons/bi";
  import { TbFilter, TbFilterOff } from "react-icons/tb";
  
  function TableReportTrans() {
    const [isloading, setIsloading] = useState(true);
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { auth } = useAuth();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("checkIn");
    const [order_direction, setOrder_direction] = useState("ASC");
    const [limit, setLimit] = useState(10);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const [rows, setRows] = useState("");
    const [amount, setAmount] = useState(0);
    const [show, setShow] = useState(false)
    const [pages, setPages] = useState([])
    const [active, setActive] = useState('Transactions')
    const axiosPrivate = useAxiosPrivate();
    const [isMobile] = useMediaQuery("(max-width: 481px)");
    const head = [
      { label: "Check In", name: "checkIn" },
      { label: "Name Rooms", name: "name" },
      { label: "User", name: "fullName" },
      { label: "Status", name: "transactionStatus" },
      { label: "Benefit", name: "price" },
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
        const res = await axiosPrivate.get(`/report?tenantId=${auth.tenantId}&search=${search}&order=${order}&order_direction=${order_direction}&limit=${limit}&start=${start}&end=${end}&page=${page}&transactionStatus=${status}`
        );
        setData(res.data.data);
        setRows(res.data.totalRows)
        setAmount(res.data.totalAmount)
  
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
  
    console.log(status)
  
    useEffect(() => {
      getData();
    }, [order_direction, order, search, status, limit, start, end, page]);
  
    return (
      <>
        <Center>
          {isMobile ? (
            <Box w="90vw" mt="2" mb="8" borderRadius="3xl" p="2" bgColor="white" boxShadow="base" >
                  <Flex Flex bgColor="white" mt="4" p="4" align="center" h="full" >
                      <Circle boxShadow="lg" size="16" bgColor="orange.100">
                          <Icon w={8} h={8} as={GrMoney}/>
                      </Circle>
                      <Box ml="4">
                          <Text fontSize="small" color="gray.500" >Total Pendapatan</Text>
                          <Text color="orange" fontSize="md" fontWeight="bold" >
                          { new Intl.NumberFormat('IND', {style: 'currency', currency: 'IDR'}).format(amount)}
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
                      {status === '' ? 
                      <Menu>
                          <MenuButton >
                              <Icon as={TbFilter} />
                          </MenuButton>
                          <MenuList>
                              <MenuItem onClick={() => {setStatus('Menunggu Konfirmasi Pembayaran'); setPage(1)}}>Menunggu Konfirmasi Pembayaran</MenuItem>
                              <MenuItem onClick={() => {setStatus('Diproses'); setPage(1)}}>Diproses</MenuItem>
                              <MenuItem onClick={() => {setStatus('Gagal'); setPage(1)}}>Gagal</MenuItem>
                              <MenuItem onClick={() => {setStatus('Dibatalkan'); setPage(1)}}>Dibatalkan</MenuItem>
                          </MenuList>
                      </Menu>
                      : <Icon as={TbFilterOff} onClick={() => {setStatus(''); setPage(1)}} />
                      }
  
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
                          <TableCaption>{data.length === 0 ? "No Item" : "Holistay Transactions Users"}</TableCaption>
                          <Thead>
                          <Tr>
                              <Th>
                                  Detail Transaction
                                  { order === "price" ? null : <TagRightIcon as={ order_direction === "ASC" ? BsSortAlphaUpAlt : BsSortAlphaDownAlt} onClick={() => setOrder_direction(order_direction === "ASC" ? "DESC" : "ASC")}/>}
                              </Th>
                              <Th>
                                  Benefit
                                  { order !== "price" ? null : <TagRightIcon as={ order_direction === "ASC" ? BsSortAlphaUpAlt : BsSortAlphaDownAlt} onClick={() => setOrder_direction(order_direction === "ASC" ? "DESC" : "ASC")}/>}
                              </Th>
                          </Tr>
                          </Thead>
                          <Tbody fontFamily="serif" >
                          {data.map(item => {
                              return(
                                  <Tr>
                                      <Td>
                                          <Box>
                                              <Text fontWeight="bold" fontSize="sm" color="orange">{item.room.name}</Text>
                                              <Text fontSize="sm">{item.user.fullName}</Text>
                                              <Text fontSize="sm">
                                                  {new Date(item.checkIn).toLocaleString('en', {
                                                  day: 'numeric',
                                                  month: 'short',
                                                  year: 'numeric',
                                                  })}
                                              </Text>
                                              <Tag size="sm" borderRadius="3xl" bgColor="orange">
                                                  <TagLabel fontSize="xx-small" >
                                                      {item.transactionStatus}
                                                  </TagLabel>
                                              </Tag>
                                          </Box>
                                          
                                      </Td>
                                      <Td isNumeric fontSize="x-small" >{ new Intl.NumberFormat('IND', {style: 'currency', currency: 'IDR'}).format(item.room.price)}</Td>
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
            <Box mt="4" bgColor="white" boxShadow="base" pb="5" borderRadius="2xl">
                  {/* <Flex p="4" m="4" align="center">
                      <Menu>
                          <MenuButton mt="2">
                              <Icon w={6} h={6} as={IoReorderFourOutline} />
                          </MenuButton>
                          <MenuList >
                              <MenuItem onClick={() => setActive('Transactions')} >Transactions</MenuItem>
                              <MenuItem onClick={() => setActive('Guest')} >Guest</MenuItem>
                              <MenuItem onClick={() => setActive('Properties')} >Properties</MenuItem>
                          </MenuList>
                      </Menu>
                      <Text ml="3" fontFamily="sans-serif" fontWeight="bold">
                          {active}
                      </Text>
                  </Flex>
                  <Flex h="15vh" p="4" m="4" borderBottom="1px" borderColor="gray.100" justify="space-between" align="center">
                      <Flex bgColor="white" mt="2" p="4" align="center" h="full" w="30%"  >
                          <Circle boxShadow="lg" size="16" bgColor="orange.100">
                              <Icon w={8} h={8} as={GrMoney}/>
                          </Circle>
                          <Box ml="4">
                              <Text fontSize="small" color="gray.500" >Total Pendapatan</Text>
                              <Text color="orange" fontSize="md" fontWeight="bold" >
                              { new Intl.NumberFormat('IND', {style: 'currency', currency: 'IDR'}).format(amount)}
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
                   
                  </Flex> */}
                  {/* <Flex m="4" justify="space-between" align="center" >
  
                      <Flex justify="end" w="full">
                          <InputGroup bgColor="gray.50" boxShadow="base" w="20%" size="sm"  borderRadius="3xl" overflow="hidden">
                              <InputLeftElement
                              pointerEvents='none'
                              children={<SearchIcon />}
                              />
                              <Input borderRadius="3xl" placeholder='Search User' value={search} onChange={(e) => {setSearch(e.target.value); setPage(1)}} fontSize="small" type="text" />
                              { search ? <InputRightElement onClick={() => setSearch('')} children={<Icon cursor="pointer" as={IoCloseOutline}/>}/> : null}
                          </InputGroup>
                          <Select boxShadow="base" bgColor="gray.50" ml="3" onChange={(e) => {setStatus(e.target.value); setPage(1)}} defaultValue={''} size="sm" w="10vw" borderRadius="2xl">
                              <option value={''}>Get All</option>
                              <option value={'Menunggu Konfirmasi Pembayaran'}>Menunggu Konfirmasi Pembayaran</option>
                              <option value={'Diproses'}>Diproses</option>
                              <option value={'Gagal'}>Gagal</option>
                              <option value={'Dibatalkan'}>Dibatalkan</option>
                          </Select>
                          <Select boxShadow="base" bgColor="gray.50" ml="3" onChange={(e) => {setLimit(e.target.value); setPage(1)}} defaultValue={10} size="sm" w="5vw" borderRadius="2xl">
                              <option value={10}>10</option>
                              <option value={2}>2</option>
                              <option value={100}>100</option>
                          </Select>
                      </Flex>
                  </Flex> */}
                <TableContainer w="75vw" m="4" >
                  <Table variant="striped">
                    <TableCaption>{`Holistay Transactions, ${rows} Items`}</TableCaption>
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
                              {new Date(item.checkIn).toLocaleString("en", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </Td>
                            <Td>{item.room.name}</Td>
                            <Td>{item.user.fullName}</Td>
                            <Td>
                                  <Tag size="sm" borderRadius="3xl" bgColor="orange">
                                      <TagLabel fontSize="smaller" >
                                          {item.transactionStatus}
                                      </TagLabel>
                                  </Tag>
                              </Td>
                            <Td isNumeric >{ new Intl.NumberFormat('IND', {style: 'currency', currency: 'IDR'}).format(item.room.price)}</Td>
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
  
  export default TableReportTrans;
  