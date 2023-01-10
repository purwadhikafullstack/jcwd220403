import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { closeModal } from '../Redux/ModalSlice'
import { Link } from "react-router-dom"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
} from '@chakra-ui/react'

function BasicUsage() {
    const dispatch = useDispatch()
    const isOpen = useSelector((state) => state.ModalSlice.isOpen)
  
    return (
      <>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={() => dispatch(closeModal())}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Congratulation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight='bold' mb='1rem'>
              Congratulations, you have become a tenant at Holistay
              </Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, doloribus dolore officia consectetur magni facere minima esse enim amet, dolor aspernatur itaque odit doloremque iste eos pariatur. Eos, quos itaque!
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => dispatch(closeModal())}>
                Close
              </Button>
              <Link to="dashboard">
              <Button variant='ghost'>Your Dashboard</Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default BasicUsage