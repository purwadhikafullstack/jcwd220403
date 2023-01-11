import React from 'react'
import { Box, Text, Image } from "@chakra-ui/react"
import NavBar from '../NavBar'
import Footer from '../Footer'
import NavBot from '../NavBot'
import empty from "../../Assets/empty.jpg"



const EmptyDashboard = () => {
    return (    
        <Box>
            <NavBar />
            <Box width="500px" margin="auto">
                <Image src={empty}/>
                <Text textAlign="center">Empty dashboard</Text>
            </Box>
            <Footer />
            <NavBot />
        </Box>
    )
}

export default EmptyDashboard
