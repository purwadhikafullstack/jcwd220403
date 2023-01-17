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
    SkeletonText,
    Skeleton,
    SkeletonCircle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
// import axios from "axios";
import useAuth from '../../hooks/useAuth';
import { useParams } from "react-router-dom";

function DetailPage() {
    const [isMobile] = useMediaQuery("(max-width: 481px)")
    const { auth } = useAuth();
    const [data, setData] = useState([])
    const [isloading, setIsloading] = useState(true)
    const params = useParams()

    const getData = async () => {
        try {
            const res = await axios.get(`/property/${params.id}`);
            setData(res.data)
            setTimeout(() => {
                setIsloading(false)
            }, 1000);
            // console.log(res.data)

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
                    <Skeleton isLoaded={!isloading}>
                        <Heading fontSize="3xl">{data?.name}</Heading>
                        <Text fontWeight="bold" fontSize="sm">{data?.category?.city}, {data?.category?.country}</Text>
                    </Skeleton>
                    
                        <Grid
                            mt="4"
                            overflow="hidden"
                            borderRadius="2xl"
                            templateRows='repeat(2, 1fr)'
                            templateColumns='repeat(4, 1fr)' gap={2}
                            >
                            <GridItem rowSpan={2} colSpan={2}><Skeleton isLoaded={!isloading}><Image src={'http://localhost:2000/propertyPicture/' + data?.picture} /></Skeleton></GridItem>
                            <GridItem colSpan={1}><Skeleton isLoaded={!isloading}> <Image src={'http://localhost:2000/propertyPicture/' + data?.picture}/></Skeleton></GridItem>
                            <GridItem colSpan={1}><Skeleton isLoaded={!isloading}> <Image src={'http://localhost:2000/propertyPicture/' + data?.picture}/></Skeleton></GridItem>
                            <GridItem colSpan={1}><Skeleton isLoaded={!isloading}> <Image src={'http://localhost:2000/propertyPicture/' + data?.picture}/></Skeleton></GridItem>
                            <GridItem colSpan={1}><Skeleton isLoaded={!isloading}> <Image src={'http://localhost:2000/propertyPicture/' + data?.picture}/></Skeleton></GridItem>
                            {isloading ? null :<Button border="1px" borderColor="black" position="absolute" mt="2" ml="2" size="sm">Tampilkan Semua Foto</Button> }
                        </Grid>
                    
                    <HStack mt="8" mb="4" w="40vw" >
                        <SkeletonCircle mr="4" size="10" isLoaded={!isloading}>
                            <Avatar size="md" src={'http://localhost:2000/propertyPicture/' + data?.picture} />
                        </SkeletonCircle>
                        <Skeleton isLoaded={!isloading}>
                            <Box>
                                <Heading mt="2" fontSize="xl">Tuan Rumah : Ilham</Heading>
                                <Text fontSize="sm" color="gray.600">3 Room</Text>
                            </Box>
                        </Skeleton>
                    </HStack>
                    <Divider/>
                        <Skeleton isLoaded={!isloading}><Text mt="4" fontWeight="bold" >Description</Text></Skeleton>
                        <SkeletonText isLoaded={!isloading}><Text mb="4" color="gray.600">{data?.description}</Text></SkeletonText>
                    <Divider/>
                </Box> 
            </Center>
            }
        </>
    );
}

export default DetailPage