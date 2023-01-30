import { Box, Center, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import MyBookingCalendar from '../../Components/Tenant/Report/CalenderAgenda'
// import AgendaCalender from '../../Components/Tenant/Report/CalenderAgenda'
import ChartLine from '../../Components/Tenant/Report/ChartLine'

const ReportPages = () => {
    const [isMobile] = useMediaQuery('(max-width: 481px)');
    return (
        <div>
            {isMobile ? 
            <Center>
                <Box w="100vw">
                    <MyBookingCalendar/>
                    <ChartLine/>
                </Box>
            </Center>
            :
            <Center>
                <Flex w="100vw" justify="space-evenly">
                    <MyBookingCalendar/>
                    <ChartLine/>
                </Flex>
            </Center>
            }
        </div>
    )
}

export default ReportPages