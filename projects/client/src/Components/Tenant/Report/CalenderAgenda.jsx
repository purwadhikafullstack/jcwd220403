import {useState, useEffect} from "react";
import { Box, Center, Text, useMediaQuery } from "@chakra-ui/react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Calendar from "react-awesome-calendar";


function AgendaCalender() {

const [isMobile] = useMediaQuery('(max-width: 481px)');
const {auth} = useAuth()
const [data, setData] = useState()
const axiosPrivate = useAxiosPrivate();

const getData = async () => {
    try {
    const colour = ["#0B9264","#DC6969", "#FBB13C", "#0B9264", "#8884d8"]
      const res = await axiosPrivate.get(`/transactions/tenant/${auth?.tenantId}`);
      res.data.map((item) => item.color = colour[Math.floor(Math.random() * 4)])
      setData(res.data)
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
    getData()
},[])

    return (
        <Center>
            {isMobile ? 
            <Box p="6" borderColor="gray" mb="10" borderRadius="3xl" boxShadow="base" w="95vw" textAlign="center" fontSize="sm" fontFamily="sans-serif" overflow="scroll" >
                <Calendar events={data} />
            </Box>
            : 
            <Box p="6" borderColor="gray" mb="10" borderRadius="3xl" boxShadow="base" w="30vw" textAlign="center" fontSize="sm" fontFamily="sans-serif" overflow="scroll" >
                <Calendar events={data} />
            </Box>
        }
        </Center>
    );
  }
  
  export default AgendaCalender;


