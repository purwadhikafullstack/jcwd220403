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
    VStack,
    Avatar,
    Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import axios from "../api/axios";
import axios from "axios";
import useAuth from '../../hooks/useAuth';
import { Link } from "react-router-dom";

function DetailPage() {
    const [isMobile] = useMediaQuery("(max-width: 481px)")
    const { auth } = useAuth();
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const res = await axios.get("https://public.opendatasoft.com//api/records/1.0/search/?dataset=airbnb-listings&q=&rows=1&start=1");
            setData(res.data.records[0].fields)
            console.log(data)

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {isMobile ? 
            <>
            
            </>
            :
            <Center>
                <Box w="80vw">
                    <Heading fontSize="3xl">{data?.name}</Heading>
                    <Text fontWeight="bold" fontSize="sm">{data?.city}, {data?.country}</Text>
                    <Grid
                        mt="4"
                        overflow="hidden"
                        borderRadius="2xl"
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(4, 1fr)' gap={2}
                        >
                        <GridItem rowSpan={2} colSpan={2} ><Image src="https://a0.muscache.com/im/pictures/b30b61e5-fad2-4363-931b-b52823a2705b.jpg?im_w=1200" /></GridItem>
                        <GridItem colSpan={1} ><Image src="https://a0.muscache.com/im/pictures/ad3a5539-d121-4e8d-80ad-1dbc4cfd3755.jpg?im_w=720"/></GridItem>
                        <GridItem colSpan={1} ><Image src={data?.xl_picture_url}/></GridItem>
                        <GridItem colSpan={1} ><Image src={data?.xl_picture_url}/></GridItem>
                        <GridItem colSpan={1} ><Image src={data?.xl_picture_url}/></GridItem>
                        <Button border="1px" borderColor="black" position="absolute" mt="2" ml="2" size="sm">Tampilkan Semua Foto</Button>
                    </Grid>
                    <Box w="40vw">
                        <HStack mt="8" mb="4" w="40vw" justify="space-between">
                            <Box>
                                <Heading mt="2" fontSize="xl">Tuan Rumah : {data?.host_name}</Heading>
                                <Text fontSize="sm" color="gray.600">3 Room</Text>
                            </Box>
                            <VStack>
                                <Avatar size="md" src={data?.xl_picture_url} />
                            </VStack>
                        </HStack>
                        <Divider/>
                        <Text mt="4" mb="4" color="gray.600">{data?.description}</Text>
                        <Divider/>
                    </Box>
                </Box>
            </Center>
            }
        </>
    );
}

export default DetailPage