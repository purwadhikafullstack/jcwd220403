import React from 'react'
import { Box, Flex, Spacer, Image, Center, Button, useBreakpointValue, useMediaQuery } from "@chakra-ui/react"
import LogoOnly from "../Assets/Logo_only.png"

const NavBarTenant = () => {

    const [isMobile] = useMediaQuery('(max-width: 481px)')
    const display = useBreakpointValue({
        base: "none",
        md: "block",
        lg: "block"
    })
    const marginTop = useBreakpointValue({
        base: "5px",
        md: "20px",
        lg: "30px"
    })
    const marginRight = useBreakpointValue({
        base: "",
        md: "10px",
        lg: "25px"
    })


    return (
        <Box height="80px" width="100%" marginTop={marginTop} position="sticky" top={0} zIndex={1} bg="white">
            <Flex style={{ ...(isMobile ? { justifyContent: "center", alignItems: "center" } : {}) }}>
                <Box width="5%" height="80px" marginLeft="20px" display={display}>
                    <Center>
                        <Image marginTop="6px" src={LogoOnly} />
                    </Center>
                </Box>
                <Spacer display={display} />
                <Box marginRight={marginRight}>
                    <Button marginTop="20px" marginRight="10px" borderRadius="20px"
                        variant="outline"
                    >Ada pertanyaan?</Button>
                    <Button marginTop="20px" variant="outline" borderRadius="20px"
                    >Simpan & keluar</Button>
                </Box>
            </Flex>
        </Box>
    )
}

export default NavBarTenant
