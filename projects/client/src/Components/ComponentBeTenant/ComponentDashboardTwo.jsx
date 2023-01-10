import React, { useState, useEffect } from 'react'
import {
    Box, Flex, Text, Icon, useDisclosure,
    Modal, ModalBody, ModalOverlay, ModalFooter, ModalCloseButton, ModalContent,
    ModalHeader, Button, Input, FormControl, FormLabel, FormHelperText, Spinner,
    useToast
} from "@chakra-ui/react"
import axios from '../../api/axios'
import { BsPlusSquareDotted } from "react-icons/bs"
import { BiEdit } from "react-icons/bi"
import { AiOutlineDelete } from "react-icons/ai"

const ComponentDashboardTwo = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [msgError, setMsgError] = useState("")
    const [load, setLoad] = useState(false)

    const isErrorName = name === ""
    const isErrorDesc = description === ""
    const isErrorPrice = price === undefined

    //for uupdate data
    const [valueName, setValueName] = useState("")
    const [valueDesc, setValueDesc] = useState("")
    const [valuePrice, setValuePrice] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [editId, setEditId] = useState(0)

    //for delete data
    const toast = useToast()

    const getDataRoom = async () => {
        try {
            const response = await axios.get("http://localhost:2000/api/property/1")
            setData(response.data.rooms)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getDataRoom()
    }, [])

    const Open = async (room) => {
        const value = await axios.get(`/roombyid/${room.id}`, {
            withCredentials: true
        })
        setEditId(room.id)
        setValueName(value.data.name)
        setValueDesc(value.data.description)
        setValuePrice(value.data.price)
        setOpenModal(true)
    }
    const Close = () => {
        setOpenModal(false)
    }

    const createDataRooms = async () => {
        try {
            await axios.post("/room/1", {
                name,
                description,
                price
            }, {
                withCredentials: true
            })
            setLoad(true)
            setTimeout(() => {
                setLoad(false)
                onClose(true)
                getDataRoom()
                setMsgError("")
            }, 3000)
        } catch (err) {
            console.log(err)
            if (err.response) {
                setMsgError(err.response.data)
            }
        }
    }
    const updateRooms = async () => {
        try {
            // console.log(room.id)
            await axios.patch(`editroom/${editId}`, {
                name,
                description,
                price
            }, {
                withCredentials: true
            })
            setLoad(true)
            setTimeout(() => {
                setLoad(false)
                setOpenModal(false)
                getDataRoom()
                setMsgError("")
            }, 3000)
        } catch (err) {
            console.log(err)
            if (err.response) {
                setMsgError(err.response.data)
            }
        }
    }
    const deleteRooms = async (room) => {
        try {
            await axios.delete(`http://localhost:2000/api/deleteroom/${room.id}`)
            getDataRoom()
            toast({
                title: 'Success',
                description: 'Data has been deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Box>
            <Box p={6}>
                <Flex flexWrap="wrap" gap="10px" justifyContent="center">
                    {data && data.map(room => (
                        <Box width="350px" borderWidth="1px" rounded="lg" overflow="hidden" mb={4} key={room.id}>
                            <Flex px={6} py={4}>
                                <Flex flexDirection="column" gap="20px">
                                    <Icon
                                        as={BiEdit}
                                        alt="Card image"
                                        boxSize="30px"
                                        objectFit="cover"
                                        cursor="pointer"
                                        alignItems="flex-start"
                                        onClick={() => Open(room)}
                                    />
                                    <Modal blockScrollOnMount={false} isOpen={openModal} onClose={Close}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Edit Rooms</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Text fontWeight='bold' mb='1rem' color="red">
                                                    {msgError}
                                                </Text>
                                                <FormControl isInvalid={isErrorName} >
                                                    <FormLabel>Room Name</FormLabel>
                                                    <Input variant="flushed" placeholder='Room name?' defaultValue={valueName}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                    {isErrorName ? (<FormHelperText color="red">Room name is required</FormHelperText>) :
                                                        (<FormHelperText color="#478fd3">Update room name is success</FormHelperText>)}
                                                </FormControl>
                                                <FormControl isInvalid={isErrorDesc} >
                                                    <FormLabel>Description</FormLabel>
                                                    <Input variant="flushed" placeholder='Description?' defaultValue={valueDesc}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                    />
                                                    {isErrorDesc ? (<FormHelperText color="red">Description is required</FormHelperText>) :
                                                        (<FormHelperText color="#478fd3">Update description success</FormHelperText>)}
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Price</FormLabel>
                                                    <Input variant="flushed" placeholder='Price?' defaultValue={valuePrice}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                    />
                                                    {isErrorPrice ? (<FormHelperText color="red">Price is required</FormHelperText>) :
                                                        (<FormHelperText color="#478fd3">Update price success</FormHelperText>)}
                                                </FormControl>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme='blue' mr={3} onClick={Close}>
                                                    Close
                                                </Button>
                                                <Button variant="outline" colorScheme="blue" onClick={updateRooms}>{load ? <Spinner /> : "Save"}</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                    <Icon
                                        as={AiOutlineDelete}
                                        alt="Card image"
                                        boxSize="30px"
                                        objectFit="cover"
                                        cursor="pointer"
                                        onClick={() => deleteRooms(room)}
                                    />
                                </Flex>
                                <Box marginLeft="30px">
                                    <Text fontSize="xl" fontWeight="bold">
                                        {room.name}
                                    </Text>
                                    <Text color="gray.600" mt={1}>
                                        {room.description}
                                    </Text>
                                    <Text mt={2} fontSize="lg" fontWeight="bold" color="teal.500">
                                        Rp.{room.price}
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                    ))}
                    <Box width="200px" height="129px" position="relative">
                        <Box position="absolute" left="40%" top="30%">
                            <Icon as={BsPlusSquareDotted} boxSize={10} cursor="pointer" onClick={onOpen} />
                        </Box>
                    </Box>
                    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create Property Rooms</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text fontWeight='bold' mb='1rem' color="red">
                                    {msgError}
                                </Text>
                                <FormControl isInvalid={isErrorName} >
                                    <FormLabel>Room Name</FormLabel>
                                    <Input variant="flushed" placeholder='Room name?' 
                                        onChange={(e) => setName(e.target.value)} 
                                    />
                                    {isErrorName ? (<FormHelperText color="red">Room name is required</FormHelperText>) :
                                        (<FormHelperText color="#478fd3">Create room name is success</FormHelperText>)}
                                </FormControl>
                                <FormControl isInvalid={isErrorDesc} >
                                    <FormLabel>Description</FormLabel>
                                    <Input variant="flushed" placeholder='Description?' 
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    {isErrorDesc ? (<FormHelperText color="red">Description is required</FormHelperText>) :
                                        (<FormHelperText color="#478fd3">Create description success</FormHelperText>)}
                                </FormControl>
                                <FormControl isInvalid={isErrorPrice}>
                                    <FormLabel>Price</FormLabel>
                                    <Input variant="flushed" placeholder='Price?' 
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    {isErrorPrice ? (<FormHelperText color="red">Price is required</FormHelperText>) :
                                        (<FormHelperText color="#478fd3">Create price success</FormHelperText>)}
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="facebook" mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button variant='ghost' colorScheme="blue" onClick={createDataRooms}>{load ? <Spinner /> : "Submit"}</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>
            </Box>
        </Box>
    )
}

export default ComponentDashboardTwo
