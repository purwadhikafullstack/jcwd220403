import React, { useState } from 'react'
import {
  Box, Tabs, TabList, TabPanels, Tab, TabPanel,
  Avatar, Heading, Flex, Center, Button, Skeleton, Spacer,
  Text, Image, Icon, MenuButton, Tag

} from "@chakra-ui/react"
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';

import EmptyDashboard from '../../Components/ComponentBeTenant/EmptyDashboard';
import DashboardOne from '../../Components/ComponentBeTenant/ComponentDashboardOne';
import ComponentDashboardTwo from '../../Components/ComponentBeTenant/ComponentDashboardTwo';
import DeleteProperty from "../../Components/ComponentBeTenant/DeleteProperty"
import { openModal } from '../../Redux/DeleteProperty';
import { useDispatch } from "react-redux"
import axios from "../../api/axios"
// import axios from "axios"
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import createImage from "../../Assets/create-data.jpg"
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Dashboard = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const { auth } = useAuth();
  const tenantId = auth.tenantId
  const [load, setLoad] = useState(false)
  // const axiosPrivate = useAxiosPrivate();

  //get dataa nanti di hapus

  const getData = async () => {
    try {
      setLoad(true)
      const response = await axios.get(`/property/${tenantId}`)
      setData(response.data)
      setLoad(false)
      if (!tenantId) {
        setTimeout(() => {
          window.location.reload()
        }, 4000)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const Loading = () => {
    return (
      <Box p={6}>
        <Box>
          <Flex>
            <Skeleton height='30px' width="100px" marginTop="10px" />
            <Spacer />
            <Skeleton height='30px' width="100px" marginTop="10px" />
          </Flex>
        </Box>
        <Box>
          <Flex>
            <Skeleton height='300px' width="550px" marginTop="10px" />
            <Spacer />
            <Skeleton height='300px' width="550px" marginTop="10px" />
          </Flex>
        </Box>
        <Box>
          <Skeleton height='300px' marginTop="10px" />
        </Box>
      </Box>
    )
  }

  const ComponentDashboard = () => {
    return (
      <Box>
        <Box p={6}>
          <Flex align="center" justify="space-between" mb={6} letterSpacing="3px">
            <Heading as="h1" size="lg" fontFamily="Uniform Pro Medium">
              Tenant Dashboard
            </Heading>
            {/* avatar nanti masih di tembak nanti di ambil dari profile!!, foto masih di tembak!! */}
            {/* <Avatar name={auth.name} src='https://bit.ly/dan-abramov' /> */}
            <Link to="/user">
              <Box>
                <Center>
                  {/* {auth?.userPhoto ? (
                    <Avatar
                      size='md'
                      name='A'
                      bgColor='#FE9900'
                      boxShadow="lg"
                      borderBottom="3px solid gray"
                      src={
                        'http://localhost:2000/profilePicture/' +
                        auth?.userPhoto
                      }
                    />
                  ) : (
                    <Avatar size='md' name={auth.name} bgColor='#FE9900' />
                  )} */}
                </Center>
                <Text textAlign="center">{auth.name}</Text>
              </Box>
            </Link>
          </Flex>
        </Box>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Property Detail</Tab>
            <Tab>Room Detail</Tab>
            <Tab>Create More Property</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DashboardOne />
            </TabPanel>
            <TabPanel>
              <ComponentDashboardTwo />
            </TabPanel>
            <TabPanel>
              <Box margin="auto" width="350px">
                <Image src={createImage} width="auto" />
              </Box>
              <Text textAlign="center" fontSize="lg">Do you want to add property to the holistay again?</Text>
              <Center>
                <Link to="/tenant/add-property">
                  <Button colorScheme="blue" variant="outline" marginTop="10px">Create Property!</Button>
                </Link>
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    )
  }

  return (
    <Box>
      <Box>
        {tenantId ?
          data !== null && data.length > 0 ? (
            <ComponentDashboard />
          ) : (
            <Box>
              <EmptyDashboard />
              <Text textAlign="center">Mungkin anda telah menghapus atau belum menambahkan property anda di Holistay
                <Link to='/tenant/add-property'>
                  <Text color="blue.400" _hover={{ fontWeight: "bold" }} >Tambahkan Property</Text>
                </Link>
              </Text>
            </Box>
          )
          :
          <Loading />
        }
      </Box>
    </Box>
  )
}

export default Dashboard