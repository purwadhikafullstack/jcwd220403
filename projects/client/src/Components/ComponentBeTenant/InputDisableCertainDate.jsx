import React, { useState } from 'react'
import {
    Box, Button, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalCloseButton, ModalBody, Text, ModalFooter,
    useToast, Spinner
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { closeModalCertainDate } from '../../Redux/CertainDate'
import Calendar from 'react-calendar';
import "../../Styles/reactCalendar.css"
import axios from "../../api/axios"

const InputDisableCertainDate = () => {
    const isOpenModalCertainDate = useSelector((state) => state.CertainDate.isOpen)
    let room = useSelector((state) => state.CertainDate.room)
    const dispatch = useDispatch()
    const [valueDate, onChange] = useState(new Date())
    const [load, setLoad] = useState(false)
    const [msg, setMsg] = useState("")
    const toast = useToast()


    const handleSubmit = async () => {
        try {
            await axios.post(`/disableCertainDate/${room.id}`, {
                date: valueDate
            })
            setLoad(true)
            setTimeout(() => {
                setLoad(false)
                dispatch(closeModalCertainDate())
                setMsg("")
                toast({
                    title: 'Success',
                    description: 'Room has been disable',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }, 3000)
        } catch (err) {
            console.log(err)
            if (err.response) {
                setMsg(err.response.data)
            }
        }
    }

    return (
        <Box>
            <Modal closeOnOverlayClick={false} isOpen={isOpenModalCertainDate} onClose={() => dispatch(closeModalCertainDate())}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Disable Certain Date</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box textAlign="center">
                            <Text color="red">{msg}</Text>
                            <Calendar onChange={onChange} value={valueDate} className="react-calendar" />
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} variant="outline" onClick={handleSubmit}>
                            {load ? <Spinner /> : "Save"}
                        </Button>
                        <Button onClick={() => dispatch(closeModalCertainDate())}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default InputDisableCertainDate
