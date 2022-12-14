import React, { useState } from 'react'
import {
    Box, Button, Modal,
    ModalContent, ModalCloseButton, ModalHeader, ModalBody, Text,
    ModalFooter, Input, Spinner
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from '../../Redux/ModalSlice'
import { isDeleteData } from '../../Redux/DoneCreatePropertiesSlice'
import axios from "axios"


const DeleteProperty = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector((state) => state.ModalSlice.isOpen)
    const name = useSelector(state => state.PropertySlice.value.name);
    const [input, setInput] = useState("")
    const [load, setLoad] = useState(false)
    const validasi = `Delete Property ${name}`


    const deleteProperty = async () => {
        try {
            await axios.delete("http://localhost:2000/api/deleteproperty/1")
            setLoad(true)
            setTimeout(() => {
                setLoad(false)
            }, 2000)
            dispatch(isDeleteData())
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Box>
            <Modal isCentered isOpen={isOpen} onClose={() => dispatch(closeModal())}>
                <ModalContent>
                    <ModalHeader textAlign="center">Delete Your Property</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text color="red">Are you sure to delete all your property data in Holistay? to ensure input like the one below</Text>
                        <Text textAlign="center" marginTop="5px" fontWeight="bold">{validasi}</Text>
                        <Input onChange={(e) => setInput(e.target.value)} textAlign="center" defaultValue={input} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => dispatch(closeModal())} marginRight="10px" variant="outline" colorScheme="cyan">Close</Button>
                        {input === validasi ? <Button onClick={deleteProperty} backgroundColor="red.400" color="white">{load ? <Spinner /> : "Delete"}</Button> :
                            <Button isDisabled="true" opacity="0.5">Delete</Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default DeleteProperty
