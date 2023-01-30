import {
    Text,
    Center,
    useMediaQuery,
    useDisclosure,
    Box,
    Flex,
    Heading,
    Select,
  } from '@chakra-ui/react';
  import { useState, useEffect, PureComponent } from 'react';
  import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer, BarChart, Legend, Bar, Line, LineChart } from 'recharts';
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
  
  function ChartLine() {
    const [isMobile] = useMediaQuery('(max-width: 481px)');
    const {auth} = useAuth()
    const [data, setData] = useState()
    const axiosPrivate = useAxiosPrivate();
    const [chart, setChart] = useState("Bar")
    const [year, setYear] = useState(2023)

    const getData = async () => {
        try {
          const res = await axiosPrivate.get(`/transactions/tenant/chart/${auth?.tenantId}/${year}`);
          setData(res.data)
        } catch (err) {
          console.log(err);
        }
      };

      class CustomizedAxisTick extends PureComponent {
        render() {
          const { x, y, stroke, payload } = this.props;
      
          return (
            <g transform={`translate(${x},${y})`}>
              <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-55)">
                {payload.value}
              </text>
            </g>
          );
        }
      }

      class CustomizedLabel extends PureComponent {
        render() {
          const { x, y, stroke, value } = this.props;
      
          return (
            <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
              {value}
            </text>
          );
        }
      }
    
    useEffect(() => {
        getData()
    },[year])

    return (
      <>
        {isMobile ? 
        <Center>
            <Box fontSize={["xx-mall", "x-small", "small"]} mb="10" boxShadow="2xl" border="1px" height={600} w="95vw" borderRadius="3xl" overflow="scroll" >
            <Box m="5" mb="-5" p="4" >
                <Text fontSize="md" fontWeight="bold">Transactions Stats</Text>
                <Select mt="2" placeholder='Tahun' size="sm" w="30vw" borderRadius="2xl">
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                </Select>
            </Box>
                <BarChart
                width={380}
                height={500}
                data={data}
                margin={{
                    top: 30,
                    right: 30,
                    left: 20,
                    bottom: 20,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Bulan" height={60} tick={<CustomizedAxisTick />}   />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={80} />
                <Bar dataKey="Menunggu Konfirmasi Pembayaran" stackId="a" fill="#0B9264" radius={10} />
                <Bar dataKey="Diproses" stackId="a" fill="#DC6969" radius={10} />
                <Bar dataKey="Aktif" stackId="a" fill="#FBB13C" radius={10} />
                <Bar dataKey="Selesai" stackId="a" fill="#0B9264" radius={10} />
                <Bar dataKey="Gagal" stackId="a" fill="#8884d8" radius={10} />
                </BarChart>
            </Box>
        </Center>
        
    :
        <Box fontSize={["xx-mall", "x-small", "small"]}  border="1px" height={600} borderRadius="3xl" overflow="scroll" >
            <Flex m="5" mb="-5" p="4" align="center" justify="space-between" >
                <Text fontSize="md" fontWeight="bold">Transactions Stats</Text>
                <Select onChange={(e) => setChart(e.target.value)} defaultValue="Bar" size="sm" w="10vw" borderRadius="2xl">
                    <option value={"Bar"}>Bar</option>
                    <option value={"Line"}>Line</option>
                </Select>
                <Select onChange={(e) => setYear(e.target.value)} defaultValue={2023} size="sm" w="10vw" borderRadius="2xl">
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                </Select>
            </Flex>
            {chart === "Bar" ? 
                <BarChart
                width={600}
                height={500}
                data={data}
                margin={{
                    top: 30,
                    right: 30,
                    left: 20,
                    bottom: 20,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Bulan" height={60} tick={<CustomizedAxisTick />}   />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="Menunggu Konfirmasi Pembayaran" stackId="a" fill="#0B9264" radius={10} />
                <Bar dataKey="Diproses" stackId="a" fill="#DC6969" radius={10} />
                <Bar dataKey="Aktif" stackId="a" fill="#FBB13C" radius={10} />
                <Bar dataKey="Selesai" stackId="a" fill="#0B9264" radius={10} />
                <Bar dataKey="Gagal" stackId="a" fill="#8884d8" radius={10} />
                </BarChart>
                : null }

                {chart === "Line" ? 
                        <LineChart
                        width={600}
                        height={500}
                        data={data}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Bulan" height={60} tick={<CustomizedAxisTick />} />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Line type="monotone" dataKey="Menunggu Konfirmasi Pembayaran" stroke="#0B9264" label={<CustomizedLabel />} />
                        <Line type="monotone" dataKey="Diproses" stroke="#DC6969" />
                        <Line type="monotone" dataKey="Aktif" stroke="#FBB13C" />
                        <Line type="monotone" dataKey="Selesai" stroke="#0B9264" />
                        <Line type="monotone" dataKey="Gagal" stroke="#8884d8" />
                      </LineChart>
                      : null}
        </Box>
    }
      </>
    );
  }
  
  export default ChartLine;
  