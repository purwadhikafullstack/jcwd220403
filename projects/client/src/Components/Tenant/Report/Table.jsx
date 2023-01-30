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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { IoCaretUp, IoCaretDown, IoCloseOutline } from "react-icons/io5";
import { SearchIcon } from "@chakra-ui/icons";

function TableReport() {
  const [isloading, setIsloading] = useState(true);
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
  const axiosPrivate = useAxiosPrivate();
  const [isMobile] = useMediaQuery("(max-width: 481px)");
  const head = [
    // { label: "Id", name: "id" },
    { label: "Check In", name: "checkIn" },
    { label: "Name Rooms", name: "name" },
    { label: "User", name: "fullName" },
    { label: "Status", name: "transactionStatus" },
    { label: "Price", name: "price" },
  ];

  const getData = async () => {
    try {
      const res = await axiosPrivate.get(
        `http://localhost:2000/api/report?tenantId=${auth.tenantId}&search=${search}&order=${order}&order_direction=${order_direction}&limit=${limit}&start=${start}&end=${end}&page=${page}&transactionStatus=${status}`
      );
      setData(res.data.data);
      setRows(res.data.totalRows)
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };

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
  }, [order_direction, order, search, status, limit]);

  return (
    <>
      <Center>
        {isMobile ? (
          <Text>Report Table Mobile</Text>
        ) : (
          <Box mt="4" bgColor="white" boxShadow="base" borderRadius="2xl">
                <Flex m="4" justify="end" >
                    <InputGroup bgColor="gray.50" boxShadow="base" w="20%" size="sm"  borderRadius="3xl" overflow="hidden">
                        <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon />}
                        />
                        <Input borderRadius="3xl" placeholder='Search User' value={search} onChange={(e) => setSearch(e.target.value)} fontSize="small" type="text" />
                        { search ? <InputRightElement onClick={() => setSearch('')} children={<Icon cursor="pointer" as={IoCloseOutline}/>}/> : null}
                    </InputGroup>
                    <Select boxShadow="base" bgColor="gray.50" ml="3" onChange={(e) => setStatus(e.target.value)} defaultValue={''} size="sm" w="10vw" borderRadius="2xl">
                        <option value={''}>Get All</option>
                        <option value={'Menunggu Konfirmasi Pembayaran'}>Menunggu Konfirmasi Pembayaran</option>
                        <option value={'Diproses'}>Diproses</option>
                        <option value={'Aktif'}>Aktif</option>
                        <option value={'Selesai'}>Selesai</option>
                        <option value={'Gagal'}>Gagal</option>
                    </Select>
                    <Select boxShadow="base" bgColor="gray.50" ml="3" onChange={(e) => setLimit(e.target.value)} defaultValue={10} size="sm" w="5vw" borderRadius="2xl">
                        <option value={10}>10</option>
                        <option value={2}>2</option>
                        <option value={100}>100</option>
                    </Select>
                </Flex>
              <TableContainer w="70vw" m="4" >
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
                  <Tbody>
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
          </Box>
        )}
      </Center>
    </>
  );
}

export default TableReport;
