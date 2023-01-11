// import { useState } from "react";
import React from "react";
import { Input, Button, FormControl, useDisclosure,
        Modal, ModalOverlay, ModalContent, ModalBody, HStack, ModalCloseButton, Text, Stack, Heading, Center, PinInput, PinInputField, Flex } from "@chakra-ui/react";
import axios from '../api/axios';
import * as Yup from "yup";
import { Field, ErrorMessage, Formik, Form } from "formik";
import Swal from 'sweetalert2'
import { useState, useRef } from "react";

export const ChangeEmail = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [open, setOpen] = useState(false)
    const [load, setLoad] = useState(false)
    const otp1 = useRef("")
    const otp2 = useRef("")
    const otp3 = useRef("")
    const otp4 = useRef("")
    const otp5 = useRef("")
    const otp6 = useRef("")
    const email = localStorage.getItem("email")

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
            }
            return "";
        }

    const registerSchema = Yup.object().shape({
        email: Yup.string().email().required('Please enter your email address')
        .test('Email', ' The email address you entered already exists. ',
        function (value) {
            return new Promise((resolve, reject) => {
                axios.get(`user/${value}/available`)
                    .then((res) => {
                        resolve(!res.data)
                    })
                    .catch((error) => {
                        if (error.response.data.content === "The email has already been taken.") {
                            resolve(false);
                        }
                    })
            })
        }
    )
    });

    const onChangeEmail = async (data) => {
        try {
            setLoad(true)
            const res = await axios.post(
                "user/otpEmail",
                data,
            );
            localStorage.setItem("email", res.data.token)
            Swal.fire({
                icon: 'success',
                title: 'Succes...',
                text: `${res.data.message}`,
                customClass: {
                    container: 'my-swal'
                }
            })
            setLoad(false)
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
                        Authorization: `Bearer ${getCookie("token")}`,
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

    const onVerification = async () => {
        try {
            const otp = `${otp1.current.value}${otp2.current.value}${otp3.current.value}${otp4.current.value}${otp5.current.value}${otp6.current.value}`
    
            const res = await axios.post("user/verification", { otp, email },
                {   headers: {
                        Authorization: `Bearer ${getCookie("token")}`,}
                },
            );

            setCookie("token", res.data.token, 1)

            Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: `${res.data.message}`,
                customClass: {
                    container: 'my-swal'
                }
            })
            localStorage.removeItem("token")

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
        <Text fontSize="sm" onClick={onOpen} mt="4" as="u" fontWeight="bold" _hover={{ cursor: "pointer" }}> {email ? "Input OTP" : "Ganti Email"} </Text>
        <Modal
        isOpen={isOpen}
        onClose={() => {setOpen(false); onClose()}}
        >
            <ModalOverlay zIndex="1000" />
                <ModalContent>
                    <ModalCloseButton />
                    {email ? 
                    <ModalBody>
                        <Stack
            spacing={4}
            w={'full'}
            maxW={'sm'}
            bg={ 'white'}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={10}>
        <Center>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Verify your Email
            </Heading>
        </Center>
        <Center
            fontSize={{ base: 'sm', sm: 'md' }}>
            We have sent code to your new email
        </Center>
        <FormControl>
            <Center>
                <HStack>
                <PinInput>
                    <PinInputField ref={otp1}/>
                    <PinInputField ref={otp2}/>
                    <PinInputField ref={otp3}/>
                    <PinInputField ref={otp4}/>
                    <PinInputField ref={otp5}/>
                    <PinInputField ref={otp6}/>
                </PinInput>
                </HStack>
            </Center>
        </FormControl>
            <Flex justify="space-between">
                <Button onClick={() => {localStorage.removeItem("token"); onClose()}}>Cancel</Button>
                <Button onClick={onVerification} bg={'teal.400'} color={'white'} _hover={{ bg: 'teal.500', }}> Verify </Button>
            </Flex>
        </Stack>
                    </ModalBody>
                    : 
                    <ModalBody>
                    {open ? 
                    <Formik
                        initialValues={{
                            email: ""
                        }}
                        validationSchema={registerSchema}
                        onSubmit={(values) => {
                            onChangeEmail(values)
                        }}
                    >
                    {(props) => {
                    return (
                        <>
                        <Form>
                        <Stack
                            spacing={4}
                            w={'full'}
                            maxW={'md'}
                            rounded={'xl'}
                            boxShadow={'lg'}
                            p={6}
                            mt="4"
                            mb="4"
                            >
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>New Email</Heading>
                        <FormControl id="email">
                        <Field
                            as={Input}
                            placeholder="Enter Your New Email"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            name="email"
                        />
                        <ErrorMessage component="div" name="email" style={{ color: "red" }}/>
                        </FormControl>
                        <Stack spacing={6}>
                        <Button
                            type="submit"
                            isLoading={load}
                            bg={'teal'}
                            color={'white'}
                            _hover={{
                            bg: 'teal.500',
                            }}>
                            Submit
                        </Button>
                        </Stack>
                    </Stack>  
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
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>Change Email?</Heading>
                        <Text fontSize={{ base: 'sm', sm: 'md' }}>please enter your password here</Text>
                        <FormControl id="oldPassword">
                        <Input
                            placeholder="Enter Your Password"
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
                    }
                </ModalContent>
        </Modal>
        </HStack>
    </>
    )
}