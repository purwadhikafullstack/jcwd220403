// import { useState } from "react";
import React from "react";
import { Input, Button, FormLabel, VStack, FormControl, useDisclosure,
        Modal, ModalOverlay, ModalHeader, ModalFooter, ModalContent, ModalBody, Center, HStack, ModalCloseButton, Text, Stack, Heading} from "@chakra-ui/react";
import axios from '../api/axios';
import * as Yup from "yup";
import { Field, ErrorMessage, Formik, Form } from "formik";
import Swal from 'sweetalert2'
import { useState } from "react";
import useAuth from '../hooks/useAuth';

export const ChangePass = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [open, setOpen] = useState(false)
    const { auth } = useAuth();

    const registerSchema = Yup.object().shape({
        password: Yup.string().required('Please enter your password').min(8, "Password should be at least eight characters"),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], "Password does not matched")
    });

    const onChangePass = async (data) => {
        try {

            const res = await axios.patch(
                "user/updatePass",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            );
            Swal.fire({
                icon: 'success',
                title: 'Succes...',
                text: `${res.data}`,
                customClass: {
                    container: 'my-swal'
                }
            })
            setOpen(false)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data}`,
                customClass: {
                    container: 'my-swal'
                }
            })
            
        }
    };

    const onSubmitPass = async () => {
        try {
            const oldPassword = document.getElementById("oldPassword").value
            const res = await axios.post(
                "user/checkPass",
                { oldPassword },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            );
            setOpen(res.data)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data}`,
                customClass: {
                    container: 'my-swal'
                }
            })
            
        }
    };


    return (
    <>
        <HStack bg="white">
        <Text fontSize="sm" onClick={onOpen} mt="4" as="u" fontWeight="bold" _hover={{ cursor: "pointer" }}>Ganti Password</Text>
        <Modal
        isOpen={isOpen}
        onClose={() => {setOpen(false); onClose()}}
        >
            <ModalOverlay zIndex="1000" />
                <ModalContent>
                    <ModalHeader>
                        <Center>{open ? "Ubah Password" : null}</Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    {open ? 
                    <Formik
                        initialValues={{
                            password: "",
                            password_confirmation: "",
                        }}
                        validationSchema={registerSchema}
                        onSubmit={(values, action) => {
                            onChangePass(values);
                            action.setFieldValue("password", "");
                            action.setFieldValue("password_confirmation", "");
                        }}
                    >
                    {(props) => {
                    return (
                        <>
                    
                        <Form>
                        <VStack spacing={4} align="flex-start">
                            <FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Field as={Input} type="password" name="password" variant="filled" />
                                    <ErrorMessage
                                    component="div"
                                    name="password"
                                    style={{ color: "red" }}
                                    />
                            </FormControl>
                            <FormControl>
                                <FormLabel >Konfirmasi Password</FormLabel>
                                <Field as={Input} type="password" name="password_confirmation" variant="filled" />
                                <ErrorMessage
                                    component="div"
                                    name="password_confirmation"
                                    style={{ color: "red" }}
                                    />
                            </FormControl>
                            <ModalFooter>
                                <Button type="submit" onClick={onClose} colorScheme='teal' mr={3}>
                                    Ubah Password
                                </Button>
                                <Button onClick={() => {setOpen(false); onClose()}}>Cancel</Button>
                            </ModalFooter>
                        </VStack>
                        </Form>
                        </>
                    );
                    }}
                    </Formik>
                    :
                    <Stack
                            spacing={4}
                            w={'full'}
                            maxW={'md'}
                            rounded={'xl'}
                            boxShadow={'lg'}
                            p={6}
                            mb="4"
                            >
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>Change password?</Heading>
                        <Text fontSize={{ base: 'sm', sm: 'md' }}>please enter your old password here</Text>
                        <FormControl id="oldPassword">
                        <Input
                            placeholder="Enter Your Old Password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                        />
                        </FormControl>
                        <Stack spacing={6}>
                        <Button
                            onClick={onSubmitPass}
                            bg={'teal'}
                            color={'white'}
                            _hover={{
                            bg: 'teal.500',
                            }}>
                            Submit
                        </Button>
                        </Stack>
                    </Stack>  
                    }
                    </ModalBody>
                </ModalContent>
        </Modal>
        </HStack>
    </>
    )
}