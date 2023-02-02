import {
  Box,
  Center,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoReorderFourOutline } from "react-icons/io5";
import ReportHome from "../../Components/Tenant/Report/Table";
import TableGuest from "../../Components/Tenant/Report/TableGuest";
import TableProperty from "../../Components/Tenant/Report/TableProperty";

const ReportPages = () => {
  const [isMobile] = useMediaQuery("(max-width: 481px)");
  const [active, setActive] = useState("Transactions");
  return (
    <div>
      <Center>
        {isMobile ? (
          <Box
            w="90vw"
            mt="4"
            bgColor="white"
            boxShadow="base"
            pb="5"
            borderRadius="2xl"
          >
            <Flex p="4" m="4" pb="-4" mb="-4" align="center">
                <Menu>
                  <MenuButton mt="2">
                    <Icon w={6} h={6} as={IoReorderFourOutline} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => setActive("Transactions")}>
                      Transactions
                    </MenuItem>
                    <MenuItem onClick={() => setActive("Guest")}>
                      Guest
                    </MenuItem>
                    <MenuItem onClick={() => setActive("Properties")}>
                      Properties
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Text ml="3" fontFamily="sans-serif" fontWeight="bold">
                  {active}
                </Text>
              </Flex>
              {active === "Transactions" ? <ReportHome /> : null}
              {active === "Guest" ? <TableGuest /> : null}
              {active === "Properties" ? <TableProperty /> : null}
          </Box>
        ) : (
          <>
            <Box
              mt="4"
              bgColor="white"
              boxShadow="base"
              pb="5"
              borderRadius="2xl"
              w="80vw"
              m="4"
            >
              <Flex p="4" m="4" pb="-4" mb="-4" align="center">
                <Menu>
                  <MenuButton mt="2">
                    <Icon w={6} h={6} as={IoReorderFourOutline} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => setActive("Transactions")}>
                      Transactions
                    </MenuItem>
                    <MenuItem onClick={() => setActive("Guest")}>
                      Guest
                    </MenuItem>
                    <MenuItem onClick={() => setActive("Properties")}>
                      Properties
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Text ml="3" fontFamily="sans-serif" fontWeight="bold">
                  {active}
                </Text>
              </Flex>
              {active === "Transactions" ? <ReportHome /> : null}
              {active === "Guest" ? <TableGuest /> : null}
              {active === "Properties" ? <TableProperty /> : null}
            </Box>
          </>
        )}
      </Center>
    </div>
  );
};

export default ReportPages;
