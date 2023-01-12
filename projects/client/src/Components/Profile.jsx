import {
    Box,
    Text,
    Flex,
    Center,
    Avatar,
    HStack,
    VStack,
    Heading,
    Divider,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    useMediaQuery,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalContent,
    ModalCloseButton,
    Image
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import { ChangeEmail } from "./ChangeEmail";
import { ChangePass } from "./ChangePass";
import Swal from "sweetalert2";
import useAuth from '../hooks/useAuth';

function ProfileSetting() {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState("")
    const [image, setImage] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [isMobile] = useMediaQuery("(max-width: 481px)")
    const fullName = useRef("");
    const gender = useRef("");
    const birthdate = useRef("");
    const { auth } = useAuth();

    const getData = async () => {
        try {
            const res = await axios.get("/user", {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            });
            setUser(res.data)
        } catch (err) {
            console.log(err);
        }
    };

    const onEdit = async (id) => {
        try {
            const user = {
                fullName: fullName.current.value,
                birthdate: birthdate.current.value,
                gender: gender.current.value,
                id
            };
            const result = await axios.patch("/user/profile", user);
            Swal.fire({
                icon: 'success',
                title: 'Succes...',
                text: `${result.data}`,
                customClass: {
                    container: 'my-swal'
                }
            })
            // window.location.reload()
        } catch (err) {
            console.log(err)
            console.log(err.response.data);
            alert(err.response.data);
        }
    };

    const handleChoose = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        const data = new FormData();
        data.append("file", image);

        await axios.patch(
            "/user/profilePic",
        data,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.accessToken}`,
            },
        }
        );
        setImage({ images: "" });
    };

    function ClosePP() {
        onClose()
        setImage("")
    }

    useEffect(() => {
        getData()
    }, [image])

    return (
        <>
        <Center>
            {isMobile ? 
            <>
            <Box w="90vw" m="4" mb="20">
                <Box w="90vw" h="70vh">
                    <HStack justify="space-between">
                        <Box>
                            <Heading fontSize="lg">Halo, saya {user.fullName?.split(" ")[0]}</Heading>
                            <Text fontSize="sm" color="gray.600">Bergabung di tahun 2022</Text>
                            <Text fontSize="sm" mt="4" as="u" fontWeight="bold" _hover={{ cursor: "pointer" }} onClick={() => setOpen(true)}>Edit Profile</Text>
                        </Box>
                        <VStack>
                            <Avatar size='md' name={user.fullName} src={'http://localhost:2000/profilePicture/' +user.photo}/>
                            <Text _hover={{ cursor: "pointer" }} as="u" fontWeight="bold" onClick={onOpen} fontSize="sm">Perbarui Foto</Text>
                            <Modal
                                isOpen={isOpen}
                                onClose={ClosePP}
                            >
                                <ModalOverlay />
                                <ModalBody p={6}>  
                                <ModalContent>
                                <ModalCloseButton />
                                    <Flex mt="8" p="6" boxShadow='lg' bg='white' textAlign="left" borderRight="1px" borderLeft="1px" borderColor="gray.100">
                                        <Box >
                                            <Image  mb="3" borderRadius="2xl" border="1px" borderColor="gray.100" src={'http://localhost:2000/profilePicture/' + user.photo} alt={user.fullName}/>
                                            <Input type="file" variant='unstyled' accept="image/png, image/jpeg, image/webp" name="file" onChange={(e) => handleChoose(e)} />
                                        </Box>
                                    </Flex>
                                    <Flex  p="6"  bg='white' maxW='40rem' justifyContent="right" borderBottomRadius="2xl">
                                        <Button width="32" disabled={!image} colorScheme="teal" onClick={() => {handleUpload(); onClose()}}> Ubah</Button>
                                    </Flex>
                                </ModalContent>
                                </ModalBody>
                            </Modal>
                        </VStack>
                    </HStack>
                    <Box>
                        <Heading fontSize="lg" mb="2" mt="8">Verifikasi identitas</Heading>
                        <Text fontSize="sm">Tunjukkan keaslian identitas Anda kepada semua orang dengan lencana verifikasi identitas.</Text>
                        <Button size="sm" mt="4" mb="4">Dapatkan Lencana</Button>
                    </Box>
                    <Divider/>
                    <Box mb="4">
                        <Heading fontSize="lg" mb="2" mt="4">Akun Terverifikasi</Heading>
                        <Text fontSize="sm">{user.email}</Text>
                        <Flex justify="space-evenly">
                            <ChangeEmail/>
                            <ChangePass/>
                        </Flex>
                    </Box>
                    <Divider/>
                {open ? 
                <>
                    <VStack spacing={4} align="flex-start" mt="8">
                        <FormControl>
                            <FormLabel htmlFor="email">Name</FormLabel>
                                <Input defaultValue={user.fullName} type="text" name="bio" variant="outline" ref={fullName}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Birthdate</FormLabel>
                                <Input defaultValue={user.birthdate} type="date" name="lokasi" variant="outline" ref={birthdate}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Gender</FormLabel>
                            <Select placeholder='Gender' defaultValue={user.gender} ref={gender}>
                                <option value='Male'>Laki-laki</option>
                                <option value='Female'>Perempuan</option>
                            </Select>
                        </FormControl>
                    </VStack>
                    <HStack w="90vw" mt="8" justify="space-between" pb="20">
                        <Text fontWeight="bold" _hover={{ cursor: "pointer" }} onClick={() => setOpen(false)} >Batalkan</Text>
                        <Button colorScheme='teal' variant='outline' w="20vw" onClick={() => onEdit(user.id)}>Edit</Button>
                    </HStack>
                </>
                : null }
                </Box>
            </Box>
            </>
            :
            <Flex justifyContent="space-evenly" w="90vw">
                <VStack w="22vw" borderRadius="xl" border="1px" borderColor="gray.400" p="4">
                    <Avatar size='2xl' name={user.fullName} src={'http://localhost:2000/profilePicture/' + user.photo}/>
                    <Text _hover={{ cursor: "pointer" }} as="u" fontWeight="bold" onClick={onOpen}>Perbarui Foto</Text>
                    <Modal
                                initialFocusRef={initialRef}
                                finalFocusRef={finalRef}
                                isOpen={isOpen}
                                onClose={ClosePP}
                            >
                                <ModalOverlay />
                                <ModalBody p={6}>  
                                <ModalContent>
                                <ModalCloseButton />
                                    <Flex mt="8" p="6" boxShadow='lg' bg='white' textAlign="left" borderRight="1px" borderLeft="1px" borderColor="gray.100">
                                        <Box >
                                            <Image  mb="3" borderRadius="2xl" border="1px" borderColor="gray.100" src={'http://localhost:2000/profilePicture/' + user.photo} alt={user.fullName}/>
                                            <Input type="file" variant='unstyled' accept="image/png, image/jpeg, image/webp" name="file" onChange={(e) => handleChoose(e)} />
                                        </Box>
                                    </Flex>
                                    <Flex  p="6"  bg='white' maxW='40rem' justifyContent="right" borderBottomRadius="2xl">
                                        <Button width="32" disabled={!image} colorScheme="teal" onClick={() => {handleUpload(); onClose()}}> Ubah</Button>
                                    </Flex>
                                </ModalContent>
                                </ModalBody>
                            </Modal>
                    <Box w="20vw">
                        <Heading fontSize="xl" mb="2" mt="14">Verifikasi identitas</Heading>
                        <Text>Tunjukkan keaslian identitas Anda kepada semua orang dengan lencana verifikasi identitas.</Text>
                        <Button mt="4" mb="4" w="inherit">Dapatkan Lencana</Button>
                        <Divider/>
                        <Heading fontSize="xl" mb="2" mt="4">Akun Terverifikasi</Heading>
                        <Text>{user.email}</Text>
                        <Flex justify="space-evenly">
                            <ChangeEmail/>
                            <ChangePass/>
                        </Flex>
                        <Divider mt="4" />
                    </Box>
                    
                </VStack>
                <Box w="50vw" h="70vh">
                    <Heading>Halo, saya {user.fullName}</Heading>
                    <Text fontSize="sm" color="gray.600">Bergabung di tahun 2022</Text>
                    <Text fontSize="sm" mt="4" as="u" fontWeight="bold" _hover={{ cursor: "pointer" }} onClick={() => setOpen(true)}>Edit Profile</Text>
                {open ? 
                <>
                    <VStack spacing={4} align="flex-start" mt="8">
                        <FormControl>
                            <FormLabel htmlFor="email">Name</FormLabel>
                                <Input defaultValue={user.fullName} type="text" name="bio" variant="outline" ref={fullName}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Birthdate</FormLabel>
                                <Input defaultValue={user.birthdate} type="date" name="lokasi" variant="outline" ref={birthdate}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Gender</FormLabel>
                            <Select placeholder='Gender' defaultValue={user.gender} ref={gender}>
                                <option value='Male'>Laki-laki</option>
                                <option value='Female'>Perempuan</option>
                            </Select>
                        </FormControl>
                    </VStack>
                    <HStack w="50vw" justify="space-between" mt="10">
                        <Text fontWeight="bold" _hover={{ cursor: "pointer" }} onClick={() => setOpen(false)} >Batalkan</Text>
                        <Button colorScheme='teal' variant='outline' w="8vw" onClick={() => onEdit(user.id)}>Edit</Button>
                    </HStack>
                </>
                : null }
                </Box>
            </Flex> 
            }
        </Center>
        </>
    );
}

export default ProfileSetting