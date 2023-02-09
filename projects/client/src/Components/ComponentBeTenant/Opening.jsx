import React from 'react'
import { Flex, Box, Text, Image, useMediaQuery, useBreakpointValue } from "@chakra-ui/react"
import { motion } from "framer-motion"

const Opening = () => {

    const Setting = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.7
            }
        }
    };

    //everything for responsive
    const [MobileToTablet] = useMediaQuery('(max-width: 825px)')
    const [isTablet] = useMediaQuery("(max-width: 768px) and (min-width: 481px)")

    const marginLeft = useBreakpointValue({
        base: "10px",
        lg: "160px"
    })

    return (
        <Flex style={{ ...(MobileToTablet ? { flexDirection: "column-reverse" } : {}) }} justifyContent="center" alignItems="center">
            <Box flex="1" marginLeft={marginLeft}>
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <Text fontFamily="Uniform Pro Medium" fontSize={42} fontWeight="bold"
                        style={{ ...(isTablet ? { textAlign: "center" } : {}) }}
                        textAlign={MobileToTablet? "center" : "none"}
                    >Beri tahu kami mengenai</Text>
                    <Text fontFamily="Uniform Pro Medium" fontSize={42} fontWeight="bold"
                        style={{ ...(isTablet ? { textAlign: "center" } : {}) }}
                        textAlign={MobileToTablet? "center" : "none"}
                    >tempat Anda</Text>
                    <Text fontFamily="Candid Light" fontSize="22px" marginTop="10px"
                        style={{ ...(isTablet ? { maxWidth: "600px", margin: "auto", marginTop: "20px" } : {}) }}
                        textAlign={MobileToTablet? "center" : "none"}
                    >
                        Pada langkah ini, kami akan menanyakan tipe properti yang Anda miliki dan apakah tamu
                        akan memesan seluruh tempat atau hanya satu kamar. Kemudian
                        beri tahu kami lokasinya
                        dan berapa tamu yang dapat menginap
                    </Text>
                </motion.div>
            </Box>
            <Box flex="1">
                <motion.div
                    variants={Setting}
                    initial="hidden"
                    animate="visible">
                    <Image marginLeft="10px" width="100%" src="https://thumbs.dreamstime.com/b/house-rent-sale-modern-white-background-d-illustration-180794527.jpg" margin="auto" />
                </motion.div>
            </Box>
        </Flex>
    )
}

export default Opening
