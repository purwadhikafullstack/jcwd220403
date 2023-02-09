import React from 'react'
import { Flex, Box, Text, Image, useMediaQuery } from "@chakra-ui/react"
import { motion } from "framer-motion"

const Closing = () => {
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

    return (
        <Flex style={{ ...(MobileToTablet ? { flexDirection: "column-reverse" } : {}) }} justifyContent="center" alignItems="center" >
            <Box flex="1">
                <Box flex="1">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.7 }}>
                        <Image marginLeft="10px" width="100%" src="https://thumbs.dreamstime.com/b/house-rent-sale-modern-white-background-d-illustration-180794527.jpg" margin="auto" />
                    </motion.div>
                </Box>
            </Box>
            <Box flex="1">
                <motion.div
                    variants={Setting}
                    initial="hidden"
                    animate="visible">
                    <Text fontFamily="Uniform Pro Medium" fontSize={32} fontWeight="bold"
                        style={{ ...(isTablet ? { textAlign: "center" } : {}) }}
                        textAlign={MobileToTablet? "center" : "none"}
                    >Terima kasih telah menggunakan Holistay</Text>
                    <Text fontFamily="Candid Light" fontSize="20px" marginTop="10px"
                        style={{ ...(isTablet ? { maxWidth: "600px", margin: "auto", marginTop: "20px" } : {}) }}
                        textAlign={MobileToTablet? "center" : "none"}
                    >
                        Pada langkah ini, kami mengucapkan terimakasih yang telah mempercayakan
                        property anda kepada kami, sebagai perantara Holistay akan terus mengiklankan
                        property anda di landingpage kami. Setelah ini anda akan mendapatkan dashboard yang
                        hanya bisa diliat oleh anda seorang untuk mengatur property anda
                    </Text>
                </motion.div>
            </Box>
        </Flex>
    )
}

export default Closing
