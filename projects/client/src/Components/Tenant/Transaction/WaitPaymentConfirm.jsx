import {
    Text,
    Center,
    useMediaQuery,
    Box,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Flex,
    Button,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Tag,
    TagLabel,
    InputRightElement,
    Select,
    TagRightIcon,
    Circle,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react';
  import { useState, useEffect } from 'react';
  import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
  import Swal from 'sweetalert2';
  import useAuth from '../../../hooks/useAuth';
  import { IoCaretDown, IoCaretUp, IoCheckmarkDoneCircleOutline, IoCloseCircleOutline, IoCloseOutline } from "react-icons/io5";
import { SearchIcon } from '@chakra-ui/icons';
import { BiFilter, BiSort } from 'react-icons/bi';
import { BsSortAlphaDownAlt, BsSortAlphaUpAlt } from 'react-icons/bs';
  
  function WaitPaymentConfirm() {
    const [isloading, setIsloading] = useState(true);
    const { auth } = useAuth();
    const [data, setData] = useState([])
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("checkIn");
    const [order_direction, setOrder_direction] = useState("ASC");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState([])
    const axiosPrivate = useAxiosPrivate();
    const [isMobile] = useMediaQuery('(max-width: 481px)');
  
    const getData = async () => {
      try {
        const res = await axiosPrivate.get(`/transactions/tenant?tenantId=${auth.tenantId}&search=${search}&order=${order}&order_direction=${order_direction}&limit=${limit}&page=${page}&transactionStatus=${'Menunggu Konfirmasi Pembayaran'}`);
        setData(res.data.response);
        
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

    const head = [
        { label: "Check In", name: "checkIn" },
        { label: "Name Rooms", name: "name" },
        { label: "User", name: "fullName" },
        { label: "Status", name: "transactionStatus" },
      ];

    const onAccept = async (data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to confirm transaction with id ${data.id}`,
            icon: 'question',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirm it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonColor: '#FE9900',
            reverseButtons: true,
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    Swal.fire({
                        title: 'Loading ..',
                        html: 'Confirmed Transaction In Progress',
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        })
                    const res = await axiosPrivate.post('/transactions/accept', data) 
                    Swal.fire(
                        'SUCCESS !',
                        `${res.data}`,
                        'success'
                    )   
                } catch (err) {
                console.log(err);
                }
                 
            }
          })
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

    const onReject = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to reject transaction with id ${id}`,
            icon: 'warning',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            showCancelButton: true,
            confirmButtonText: 'Reject it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonColor: '#FE9900',
            reverseButtons: true,
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    Swal.fire({
                        title: 'Loading ..',
                        html: 'Reject Transaction In Progress',
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        })
                    const res = await axiosPrivate.post('/transactions/reject', {id}) 
                    Swal.fire(
                        'SUCCESS !',
                        `${res.data}`,
                        'success'
                    )   
                } catch (err) {
                console.log(err);
                }
                 
            }
          })
    }

      useEffect(() => {
          getData()
      }, [order_direction, order, search, limit, page])
  
    return (
      <>
        <Center>
          {isMobile ? (
            <Box w="90vw" mt="2" borderRadius="3xl" p="2" bgColor="white" boxShadow="base" >
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
                        <TableCaption>{data.length === 0 ? "No Item" : "Holistay Transactions Users"}</TableCaption>
                        <Thead>
                        <Tr>
                            <Th>
                                Detail Transaction
                                { order === "price" ? null : <TagRightIcon as={ order_direction === "ASC" ? BsSortAlphaUpAlt : BsSortAlphaDownAlt} onClick={() => setOrder_direction(order_direction === "ASC" ? "DESC" : "ASC")}/>}
                            </Th>
                            <Th>Action</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
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
                                            <Tag size="sm" borderRadius="3xl" bgColor="orange" >
                                                <TagLabel fontSize="xx-small" >
                                                    {item.transactionStatus}
                                                </TagLabel>
                                            </Tag>
                                        </Box>
                                    </Td>
                                    <Td justifyContent="center">
                                        <Flex justify="space-between" w="16">
                                            <Icon as={IoCheckmarkDoneCircleOutline} w={8} h={8} color='green.500' cursor="pointer" onClick={() => onAccept(item)}/>
                                            <Icon as={IoCloseCircleOutline} w={8} h={8} color='red.500' cursor="pointer" onClick={() => onReject(item.id)}/>
                                        </Flex>
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
            <Box mt="4" bgColor="white" boxShadow="base" borderRadius="2xl">
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
                                <option value={10}>10</option>
                                <option value={2}>2</option>
                                <option value={100}>100</option>
                            </Select>
                        </Flex>
                    </Flex>
                    <TableContainer w="75vw" m="4">
                        <Table variant='striped'>
                            <TableCaption>{data.length === 0 ? "No Item" : "Holistay Transactions Users"}</TableCaption>
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
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            {data.map(item => {
                                return(
                                    <Tr>
                                        <Td>{new Date(item.checkIn).toLocaleString('en', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            })}</Td>
                                        <Td>{item.room.name}</Td>
                                        <Td>{item.user.fullName}</Td>
                                        <Td>
                                            <Tag size="sm" borderRadius="3xl" bgColor="orange" >
                                                <TagLabel fontSize="smaller" >
                                                    {item.transactionStatus}
                                                </TagLabel>
                                            </Tag>
                                        </Td>
                                        <Td>
                                            <Flex>
                                               <Icon as={IoCheckmarkDoneCircleOutline} w={8} h={8} color='green.500' cursor="pointer" onClick={() => onAccept(item)}/>
                                               <Icon as={IoCloseCircleOutline} w={8} h={8} color='red.500' cursor="pointer" onClick={() => onReject(item.id)}/>
                                            </Flex>
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
          )}
        </Center>
      </>
    );
  }
  
  export default WaitPaymentConfirm;
  