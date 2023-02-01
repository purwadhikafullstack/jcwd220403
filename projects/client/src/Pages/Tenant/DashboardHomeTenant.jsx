import { Box, Center, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import MyBookingCalendar from '../../Components/Tenant/Report/CalenderAgenda'
import AgendaCalender from '../../Components/Tenant/Report/CalenderAgenda'
import ChartLine from '../../Components/Tenant/Report/ChartLine'

const DashboardHomeTenant = () => {
    const [isMobile] = useMediaQuery('(max-width: 481px)');
    return (
        <div>
            {isMobile ? 
            <Center>
                <Box w="100vw">
                    <AgendaCalender/>
                    <ChartLine/>
                </Box>
            </Center>
            :
            <Center>
                <Flex w="100vw" m="5" justify="space-evenly">
                    <AgendaCalender/>
                    <ChartLine/>
                </Flex>
            </Center>
            }
        </div>
    )
}

export default DashboardHomeTenant