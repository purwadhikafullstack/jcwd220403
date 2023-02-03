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
  Select,
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
import {
  IoCaretUp,
  IoCaretDown,
  IoCloseOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { GrMoney } from "react-icons/gr";
import { SearchIcon } from "@chakra-ui/icons";
import { DateRange } from "react-date-range";
import { BsSortAlphaDownAlt, BsSortAlphaUpAlt } from "react-icons/bs";
import { BiSort } from "react-icons/bi";
import { TbFilter, TbFilterOff } from "react-icons/tb";
import { MdApartment } from "react-icons/md";

function TableProperty() {
  const [isloading, setIsloading] = useState(true);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("count");
  const [order_direction, setOrder_direction] = useState("ASC");
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [page, setPage] = useState(1);
  const [property, setProperty] = useState("");
  const [rows, setRows] = useState("");
  const [show, setShow] = useState(false);
  const [pages, setPages] = useState([]);
  const [properties, setProperties] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [isMobile] = useMediaQuery("(max-width: 481px)");
  const head = [
    { label: "Name Room", name: "name" },
    { label: "Dikunjungi", name: "count" },
    { label: "Total Transaksi", name: "total_amount" },
  ];

  const [state, setState] = useState([
    {
      startDate: search.state ? search.state[0].startDate : new Date(),
      endDate: search.state ? search.state[0].endDate : new Date(),
      key: "selection",
    },
  ]);

  const getData = async () => {
    try {
      const res = await axiosPrivate.get(
        `http://localhost:2000/api/report/room?tenantId=${auth.tenantId}&search=${search}&order=${order}&order_direction=${order_direction}&limit=${limit}&start=${start}&end=${end}&page=${page}&propertyname=${property}`
      );
      setData(res.data.data);
      setRows(res.data.totalRows);
      setProperties(res.data.property);

      console.log(res.data);

      const allpage = [];
      for (let i = 1; i <= res.data.totalPage; i++) {
        allpage.push(i);
      }
      setPages(allpage);
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const selectDate = () => {
    setStart(state[0].startDate);
    setEnd(state[0].endDate);
    setPage(1);
    setShow(true);
    onClose();
  };

  const deleteDate = () => {
    setStart("");
    setEnd("");
    setShow(false);
  };

  const ordering = (a, b) => {
    if (b === "ASC") {
      setOrder(a);
      setOrder_direction("DESC");
    } else if (b === "DESC") {
      setOrder(a);
      setOrder_direction("ASC");
    }
  };

  console.log(property);

  useEffect(() => {
    getData();
  }, [order_direction, order, search, property, limit, start, end, page]);

  return (
    <>
      <Center>
        {isMobile ? (
          <Box w="90vw" mt="2" mb="8" p="2">
            <Flex Flex bgColor="white" mt="4" p="4" align="center" h="full">
              <Circle boxShadow="lg" size="16" bgColor="orange.100">
                <Icon w={8} h={8} as={MdApartment} />
              </Circle>
              <Box ml="4">
                <Text fontSize="small" color="gray.500">
                  Jumlah Kamar
                </Text>
                <Text color="orange" fontSize="md" fontWeight="bold">
                  {rows}
                </Text>
                <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                  <PopoverTrigger>
                    <Flex fontSize="xx-small" align="center">
                      {!show ? (
                        <Icon ww={3} h={3} as={IoCalendarOutline} mr="2" />
                      ) : null}

                      {!show
                        ? "Sesuaikan Tanggal"
                        : new Date(state[0]["startDate"]).toLocaleString("en", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }) +
                          " - " +
                          new Date(state[0]["endDate"]).toLocaleString("en", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                      {show ? (
                        <Icon
                          w={3}
                          h={3}
                          as={IoCloseOutline}
                          ml="2"
                          onClick={deleteDate}
                        />
                      ) : null}
                    </Flex>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent w="full">
                      <PopoverArrow />
                      <PopoverBody>
                        <Center>
                          <Box
                            border="1px"
                            borderRadius="xl"
                            borderColor="gray.100"
                            overflow="hidden"
                          >
                            <DateRange
                              fixedHeight={true}
                              rangeColors={["#FE9900"]}
                              editableDateInputs={true}
                              onChange={(item) => setState([item.selection])}
                              moveRangeOnFirstSelection={false}
                              ranges={state}
                              showMonthAndYearPickers={false}
                            />
                          </Box>
                        </Center>
                      </PopoverBody>
                      <PopoverFooter>
                        <Button
                          size="sm"
                          onClick={selectDate}
                          colorScheme="orange"
                        >
                          Select Date
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Box>
            </Flex>
            <Flex m="4" w="30vw" justify="space-evenly" alignSelf="flex-end" >
              <Menu>
                <MenuButton>
                  <Icon as={BiSort} />
                </MenuButton>
                <MenuList>
                  {head.map((item) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setOrder(item.name);
                          setPage(1);
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
              {property === "" ? (
                <Menu>
                  <MenuButton>
                    <Icon as={TbFilter} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        setProperty("");
                        setPage(1);
                      }}
                    >
                      Get All
                    </MenuItem>
                    {properties.map((item) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            setProperty(item.name);
                            setPage(1);
                          }}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
              ) : (
                <Icon
                  as={TbFilterOff}
                  onClick={() => {
                    setProperty("");
                    setPage(1);
                  }}
                />
              )}

              <Menu>
                <MenuButton fontSize="x-small" alignSelf="center">
                  {limit}
                  <Icon as={IoCaretDown} />
                </MenuButton>
                <MenuList fontSize="x-small">
                  <MenuItem
                    onClick={() => {
                      setLimit(2);
                      setPage(1);
                    }}
                  >
                    2
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setLimit(10);
                      setPage(1);
                    }}
                  >
                    10
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setLimit(100);
                      setPage(1);
                    }}
                  >
                    100
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <TableContainer w="88vw">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>
                      Detail Room
                      {order === "count" ? null : (
                        <TagRightIcon
                          as={
                            order_direction === "ASC"
                              ? BsSortAlphaUpAlt
                              : BsSortAlphaDownAlt
                          }
                          onClick={() =>
                            setOrder_direction(
                              order_direction === "ASC" ? "DESC" : "ASC"
                            )
                          }
                        />
                      )}
                    </Th>
                    <Th>
                      Dikunjungi
                      {order !== "count" ? null : (
                        <TagRightIcon
                          as={
                            order_direction === "ASC"
                              ? BsSortAlphaUpAlt
                              : BsSortAlphaDownAlt
                          }
                          onClick={() =>
                            setOrder_direction(
                              order_direction === "ASC" ? "DESC" : "ASC"
                            )
                          }
                        />
                      )}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody fontFamily="serif">
                  {data.map((item) => {
                    return (
                      <Tr>
                        <Td>
                          <Box>
                            <Text
                              fontWeight="bold"
                              fontSize="sm"
                              color="orange"
                            >
                              {item.room.name}
                            </Text>
                            <Text fontSize="sm">{item.room.property.name}</Text>
                            <Text fontSize="xx-small">
                              {new Intl.NumberFormat("IND", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.total_amount)}
                            </Text>
                          </Box>
                        </Td>
                        <Td isNumeric>{item.count}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Flex w="full" justify="center" align="center">
              {pages.length === 1
                ? null
                : pages.map((item) => {
                    return (
                      <Circle
                        bgColor={page === item ? "orange" : "gray.100"}
                        onClick={() => setPage(item)}
                        cursor="pointer"
                        boxShadow="base"
                        m="0.5"
                        fontSize="small"
                        justify="center"
                        w="7"
                        p="1"
                      >
                        {item}
                      </Circle>
                    );
                  })}
            </Flex>
          </Box>
        ) : (
          <Box>
            <Flex
              h="15vh"
              p="4"
              m="4"
              borderBottom="1px"
              borderColor="gray.100"
              justify="space-between"
              align="center"
            >
              <Flex
                bgColor="white"
                mt="2"
                p="4"
                align="center"
                h="full"
                w="30%"
              >
                <Circle boxShadow="lg" size="16" bgColor="orange.100">
                  <Icon w={8} h={8} as={MdApartment} />
                </Circle>
                <Box ml="4">
                  <Text fontSize="small" color="gray.500">
                    Jumlah Kamar
                  </Text>
                  <Text color="orange" fontSize="md" fontWeight="bold">
                    {rows}
                  </Text>
                </Box>
              </Flex>
              <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                <PopoverTrigger>
                  <Flex
                    boxShadow="base"
                    cursor="pointer"
                    justify="center"
                    fontSize="sm"
                    border="1px"
                    borderColor="gray.100"
                    align="center"
                    bgColor="gray.50"
                    p="2"
                    borderRadius="2xl"
                    w="25%"
                    h="8"
                  >
                    {!show ? (
                      <Icon w={5} h={5} m="2" as={IoCalendarOutline} />
                    ) : null}
                    <Text>
                      {!show
                        ? "Cari Tanggal .."
                        : new Date(state[0]["startDate"]).toLocaleString("en", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }) +
                          " - " +
                          new Date(state[0]["endDate"]).toLocaleString("en", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                    </Text>
                    {show ? (
                      <Icon
                        w={5}
                        h={5}
                        m="2"
                        as={IoCloseOutline}
                        onClick={deleteDate}
                      />
                    ) : null}
                  </Flex>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent w="full">
                    <PopoverArrow />
                    <PopoverBody>
                      <Center>
                        <Box
                          border="1px"
                          borderRadius="xl"
                          borderColor="gray.100"
                          overflow="hidden"
                        >
                          <DateRange
                            fixedHeight={true}
                            rangeColors={["#FE9900"]}
                            editableDateInputs={true}
                            onChange={(item) => setState([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            showMonthAndYearPickers={false}
                          />
                        </Box>
                      </Center>
                    </PopoverBody>
                    <PopoverFooter>
                      <Button
                        size="sm"
                        onClick={() => selectDate()}
                        colorScheme="orange"
                      >
                        Select Date
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Flex>
            <Flex m="4" justify="space-between" align="center">
              <Flex justify="end" w="full">
                <Select
                  boxShadow="base"
                  bgColor="gray.50"
                  ml="3"
                  onChange={(e) => {
                    setProperty(e.target.value);
                    setPage(1);
                  }}
                  defaultValue={""}
                  size="sm"
                  w="10vw"
                  borderRadius="2xl"
                >
                  <option value={""}>Get All</option>
                  {properties.map((item) => {
                    return <option value={item.name}>{item.name}</option>;
                  })}
                </Select>
                <Select
                  boxShadow="base"
                  bgColor="gray.50"
                  ml="3"
                  onChange={(e) => {
                    setLimit(e.target.value);
                    setPage(1);
                  }}
                  defaultValue={10}
                  size="sm"
                  w="5vw"
                  borderRadius="2xl"
                >
                  <option value={10}>10</option>
                  <option value={2}>2</option>
                  <option value={100}>100</option>
                </Select>
              </Flex>
            </Flex>
            <TableContainer w="75vw" m="4">
              <Table variant="striped">
                <Thead>
                  <Tr>
                    {head.map((item) => {
                      return (
                        <Th
                          textAlign="center"
                          cursor="pointer"
                          onClick={() => ordering(item.name, order_direction)}
                        >
                          {item.label}
                          {order === item.name ? (
                            <TagRightIcon
                              as={
                                order_direction === "ASC"
                                  ? IoCaretUp
                                  : IoCaretDown
                              }
                            />
                          ) : null}
                        </Th>
                      );
                    })}
                  </Tr>
                </Thead>
                <Tbody fontFamily="serif">
                  {data.map((item) => {
                    return (
                      <Tr>
                        <Td>
                          <Box>
                            <Text
                              fontWeight="bold"
                              fontSize="sm"
                              color="orange"
                            >
                              {item.room.name}
                            </Text>
                            <Text fontSize="sm">{item.room.property.name}</Text>
                          </Box>
                        </Td>
                        <Td isNumeric>{item.count}</Td>
                        <Td isNumeric>
                          {new Intl.NumberFormat("IND", {
                            style: "currency",
                            currency: "IDR",
                          }).format(item.total_amount)}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Flex w="full" justify="center" align="center">
              {pages.length === 1
                ? null
                : pages.map((item) => {
                    return (
                      <Circle
                        bgColor={page === item ? "orange" : "gray.100"}
                        onClick={() => setPage(item)}
                        cursor="pointer"
                        boxShadow="base"
                        m="0.5"
                        fontSize="small"
                        justify="center"
                        w="7"
                        p="1"
                      >
                        {item}
                      </Circle>
                    );
                  })}
            </Flex>
          </Box>
        )}
      </Center>
    </>
  );
}

export default TableProperty;
