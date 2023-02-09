// import { useState } from "react";
import React from "react";
import { Button, useDisclosure,
        Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalHeader, ModalFooter, Tag, TagLabel, Center, Image } from "@chakra-ui/react";
import { useState } from "react";
import useAuth from '../../../hooks/useAuth';

export const ModalPaymentProff = ({item}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { auth } = useAuth();

    return (
        <>
        <Tag onClick={onOpen} cursor="pointer" size="sm" borderRadius="3xl" bgColor="orange" >
            <TagLabel fontSize="smaller" >
                {item.transactionStatus}
            </TagLabel>
        </Tag>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
                <Center>
                    <Image
                    m="4"
                    width="200px"
                    name={item.id}
                    src={process.env.REACT_APP_URL_PUBLIC +
                        "paymentProof/" +
                        item.payment.paymentProof}
                    />
                </Center>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" size="sm" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}