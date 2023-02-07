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
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Link,
  Icon,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ChangeEmail } from "./ChangeEmail";
import { ChangePass } from "./ChangePass";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import * as Yup from "yup";
import { Field, ErrorMessage, Formik, Form } from "formik";
import { IoCloseCircleOutline } from "react-icons/io5";

function ProfileSetting() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [image, setImage] = useState(null);
  const [large, setLarge] = useState(true);
  const [isloading, setIsloading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const fileRef = useRef(null);
  const [isMobile] = useMediaQuery("(max-width: 481px)");
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const formSchema = Yup.object().shape({
    fullName: Yup.string().required("Please enter your name"),
    birthdate: Yup.date().required("Please enter your birthdate"),
    gender: Yup.string().required("Please enter your gender"),
  });

  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required('Browse your image')
      .test('fileSize', 'File too large', (value) => value === null || (value && value.size <= 1000000))
  })

  const getData = async () => {
    try {
      const res = await axiosPrivate.get("/user");
      setUser(res.data);
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onEdit = async (data) => {
    try {
      const user = { ...data, id: auth.userId };
      const result = await axiosPrivate.patch("/user/profile", user);
      getData();
      Swal.fire({
        icon: "success",
        title: "Succes...",
        text: `${result.data}`,
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [image, large]);

  const handleUpload = async () => {
    setIsloading(true);
    const data = new FormData();
    data.append("userId", auth.userId);
    data.append("fileUploaded", image);

    await axiosPrivate.patch("/user/profilePic", data);
    setIsloading(false);
    window.location.reload()
  };

  function ClosePP() {
    onClose();
    setImage(null);
  }

  return (
    <>
      <Center>
        {isMobile ? (
          <>
            <Box w="90vw" m="4" mb="20">
              <Box w="90vw" h="70vh">
                <HStack justify="space-between">
                  <Box>
                    <Skeleton isLoaded={!isloading}>
                      <Heading fontSize="lg">
                        Halo, saya {user.fullName?.split(" ")[0]}
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        Bergabung di tahun 2022
                      </Text>
                      <Text
                        fontSize="sm"
                        mt="4"
                        as="u"
                        fontWeight="bold"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => setOpen(true)}
                      >
                        Edit Profile
                      </Text>
                    </Skeleton>
                  </Box>
                  <VStack>
                    <SkeletonCircle size="" isLoaded={!isloading}>
                      <Avatar
                        size="md"
                        src={
                          process.env.REACT_APP_URL_PUBLIC +
                          "profilePicture/" +
                          auth?.userPhoto
                        }
                      />
                    </SkeletonCircle>
                    <Skeleton isLoaded={!isloading}>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        as="u"
                        fontWeight="bold"
                        onClick={onOpen}
                        fontSize="sm"
                      >
                        Perbarui Foto
                      </Text>
                    </Skeleton>
                    <Modal isOpen={isOpen} onClose={ClosePP}>
                      <ModalOverlay />
                      <ModalBody p={6}>
                        <ModalContent>
                          <ModalCloseButton />
                          <VStack mt="8" p="6" w="full" mb="6">
                      <Formik
                        initialValues={{
                          file: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                          handleUpload()
                        }}
                      >
                        {({ values, setFieldValue }) => {
                          return (
                            <Form>
                              <Input
                                ref={fileRef}
                                hidden
                                as={Input}
                                type="file"
                                name="file"
                                accept='image/png, image/jpeg, image/webp'
                                onChange={(e) => {
                                  setFieldValue("file", e.target.files[0]);
                                  setImage(e.target.files[0]);
                                }}
                              />
                              <Box
                                w="300px"
                                borderRadius="2xl"
                                border="1px"
                                borderColor="gray.300"
                              >
                                {image ? (
                                  <>
                                    <Flex align="center" >
                                        <Icon
                                          w={8}
                                          h={8}
                                          as={IoCloseCircleOutline}
                                          cursor="pointer"
                                          color="orange"
                                          onClick={() => {setImage(""); setFieldValue("")}}
                                          _hover={{ color: "gray.300" }}
                                          />
                                        <Text fontSize="x-small" display="flex">{image?.name}</Text>
                                      </Flex>
                                    <Center>
                                      <Image
                                        width="200px"
                                        name={user.fullName}
                                        src={URL.createObjectURL(image)}
                                        />
                                    </Center>
                                  </>
                                ) : null}
                                <VStack
                                  onClick={() => fileRef.current.click()}
                                  w="inherit"
                                  cursor="pointer"
                                >
                                  <Text
                                    fontWeight="bold"
                                    fontSize="sm"
                                    fontFamily="monospace"
                                    p="5"
                                  >
                                    {image
                                      ? "Change Image ?"
                                      : "Browse Your Image"}
                                  </Text>
                                  <ErrorMessage
                                    component="div"
                                    name="file"
                                    style={{ color: "red" }}
                                  />
                                </VStack>
                              </Box>
                              {image ? <Button mt="2" variant="outline" borderRadius="2xl" w="full" colorScheme="green" type="submit" isLoading={isloading} >Upload</Button> : null}
                            </Form>
                          );
                        }}
                      </Formik>
                    </VStack>
                        </ModalContent>
                      </ModalBody>
                    </Modal>
                  </VStack>
                </HStack>
                <Box>
                  <Skeleton isLoaded={!isloading}>
                    <Heading fontSize="lg" mb="2" mt="8">
                      Verifikasi identitas
                    </Heading>
                  </Skeleton>
                  <SkeletonText isLoaded={!isloading}>
                    <Text fontSize="sm">
                      Tunjukkan keaslian identitas Anda kepada semua orang
                      dengan lencana verifikasi identitas.
                    </Text>
                  </SkeletonText>
                  <Skeleton isLoaded={!isloading}>
                    <Button size="sm" mt="4" mb="4">
                      Dapatkan Lencana
                    </Button>
                  </Skeleton>
                </Box>
                <Divider />
                <Box mb="4">
                  <Skeleton isLoaded={!isloading}>
                    <Heading fontSize="lg" mb="2" mt="4">
                      Akun Terverifikasi
                    </Heading>
                  </Skeleton>
                  <Skeleton isLoaded={!isloading}>
                    <Text fontSize="sm">{user.email}</Text>
                  </Skeleton>
                  <Skeleton isLoaded={!isloading}>
                    <Flex justify="space-evenly">
                      <ChangeEmail />
                      <ChangePass />
                    </Flex>
                  </Skeleton>
                </Box>
                <Divider />
                {open ? (
                  <Formik
                    initialValues={{
                      fullName: user.fullName,
                      birthdate: user.birthdate,
                      gender: user.gender,
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values, action) => {
                      onEdit(values);
                    }}
                  >
                    {(props) => {
                      return (
                        <>
                          <Form>
                            <VStack spacing={4} align="flex-start" mt="8">
                              <FormControl>
                                <FormLabel htmlFor="email">Name</FormLabel>
                                <Field
                                  as={Input}
                                  type="text"
                                  name="fullName"
                                  variant="outline"
                                />
                                <ErrorMessage
                                  component="div"
                                  name="fullName"
                                  style={{ color: "red" }}
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel htmlFor="password">
                                  Birthdate
                                </FormLabel>
                                <Field
                                  as={Input}
                                  type="date"
                                  name="birthdate"
                                  variant="outline"
                                />
                                <ErrorMessage
                                  component="div"
                                  name="birthDate"
                                  style={{ color: "red" }}
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel htmlFor="password">Gender</FormLabel>
                                <Field
                                  as={Select}
                                  placeholder="Gender"
                                  name="gender"
                                >
                                  <option value="Male">Laki-laki</option>
                                  <option value="Female">Perempuan</option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  name="gender"
                                  style={{ color: "red" }}
                                />
                              </FormControl>
                            </VStack>
                            <HStack
                              w="90vw"
                              mt="8"
                              justify="space-between"
                              pb="20"
                            >
                              <Text
                                fontWeight="bold"
                                _hover={{ cursor: "pointer" }}
                                onClick={() => setOpen(false)}
                              >
                                Batalkan
                              </Text>
                              <Button
                                colorScheme="teal"
                                variant="outline"
                                w="20vw"
                                type="submit"
                              >
                                Edit
                              </Button>
                            </HStack>
                          </Form>
                        </>
                      );
                    }}
                  </Formik>
                ) : null}
              </Box>
            </Box>
          </>
        ) : (
          <Flex justifyContent="space-evenly" w="90vw">
            <VStack
              w="22vw"
              borderRadius="xl"
              border="1px"
              borderColor="gray.400"
              p="4"
            >
              <SkeletonCircle size="" isLoaded={!isloading}>
                <Avatar
                  size="2xl"
                  src={
                    process.env.REACT_APP_URL_PUBLIC +
                    "profilePicture/" +
                    auth?.userPhoto
                  }
                />
              </SkeletonCircle>
              <Skeleton isLoaded={!isloading}>
                <Text
                  _hover={{ cursor: "pointer" }}
                  as="u"
                  fontWeight="bold"
                  onClick={onOpen}
                >
                  Perbarui Foto
                </Text>
              </Skeleton>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={ClosePP}
              >
                <ModalOverlay  />
                <ModalBody p={6}  >
                  <ModalContent>
                    <ModalCloseButton />
                    <VStack mt="8" p="6" w="full" mb="6">
                      <Formik
                        initialValues={{
                          file: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                          handleUpload()
                        }}
                      >
                        {({ values, setFieldValue }) => {
                          return (
                            <Form>
                              <Input
                                ref={fileRef}
                                hidden
                                as={Input}
                                type="file"
                                name="file"
                                accept='image/png, image/jpeg, image/webp'
                                onChange={(e) => {
                                  setFieldValue("file", e.target.files[0]);
                                  setImage(e.target.files[0]);
                                }}
                              />
                              <Box
                                w="300px"
                                borderRadius="2xl"
                                border="1px"
                                borderColor="gray.300"
                              >
                                {image ? (
                                  <>
                                    <Flex align="center" >
                                        <Icon
                                          w={8}
                                          h={8}
                                          as={IoCloseCircleOutline}
                                          cursor="pointer"
                                          color="orange"
                                          onClick={() => {setImage(""); setFieldValue("")}}
                                          _hover={{ color: "gray.300" }}
                                          />
                                        <Text fontSize="x-small" display="flex">{image?.name}</Text>
                                      </Flex>
                                    <Center>
                                      <Image
                                        width="200px"
                                        name={user.fullName}
                                        src={URL.createObjectURL(image)}
                                        />
                                    </Center>
                                  </>
                                ) : null}
                                <VStack
                                  onClick={() => fileRef.current.click()}
                                  w="inherit"
                                  cursor="pointer"
                                >
                                  <Text
                                    fontWeight="bold"
                                    fontSize="sm"
                                    fontFamily="monospace"
                                    p="5"
                                  >
                                    {image
                                      ? "Change Image ?"
                                      : "Browse Your Image"}
                                  </Text>
                                  <ErrorMessage
                                    component="div"
                                    name="file"
                                    style={{ color: "red" }}
                                  />
                                </VStack>
                              </Box>
                              {image ? <Button mt="2" variant="outline" borderRadius="2xl" w="full" colorScheme="green" type="submit" isLoading={isloading} >Upload</Button> : null}
                            </Form>
                          );
                        }}
                      </Formik>
                    </VStack>
                  </ModalContent>
                </ModalBody>
              </Modal>
              <Box w="20vw">
                <Skeleton isLoaded={!isloading}>
                  <Heading fontSize="xl" mb="2" mt="14">
                    Verifikasi identitas
                  </Heading>
                </Skeleton>
                <Skeleton isLoaded={!isloading}>
                  <Text>
                    Tunjukkan keaslian identitas Anda kepada semua orang dengan
                    lencana verifikasi identitas.
                  </Text>
                </Skeleton>
                <Skeleton isLoaded={!isloading}>
                  <Button mt="4" mb="4" w="inherit">
                    Dapatkan Lencana
                  </Button>
                </Skeleton>
                <Divider />
                <Skeleton isLoaded={!isloading}>
                  <Heading fontSize="xl" mb="2" mt="4">
                    Akun Terverifikasi
                  </Heading>
                </Skeleton>
                <Skeleton isLoaded={!isloading}></Skeleton>
                <Skeleton isLoaded={!isloading}>
                  <Text>{user.email}</Text>
                  <Flex justify="space-evenly">
                    <ChangeEmail />
                    <ChangePass />
                  </Flex>
                </Skeleton>
                <Divider mt="4" />
              </Box>
            </VStack>
            <Box w="50vw" h="70vh">
              <Skeleton isLoaded={!isloading}>
                <Heading>Halo, saya {user.fullName}</Heading>
                <Text fontSize="sm" color="gray.600">
                  Bergabung di tahun 2022
                </Text>
                <Text
                  fontSize="sm"
                  mt="4"
                  as="u"
                  fontWeight="bold"
                  _hover={{ cursor: "pointer" }}
                  onClick={() => setOpen(true)}
                >
                  Edit Profile
                </Text>
              </Skeleton>
              {open ? (
                <Formik
                  initialValues={{
                    fullName: user.fullName,
                    birthdate: user.birthdate,
                    gender: user.gender,
                  }}
                  validationSchema={formSchema}
                  onSubmit={(values, action) => {
                    onEdit(values);
                  }}
                >
                  {(props) => {
                    return (
                      <>
                        <Form>
                          <VStack spacing={4} align="flex-start" mt="8">
                            <FormControl>
                              <FormLabel htmlFor="email">Name</FormLabel>
                              <Field
                                as={Input}
                                type="text"
                                name="fullName"
                                variant="outline"
                              />
                              <ErrorMessage
                                component="div"
                                name="fullName"
                                style={{ color: "red" }}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel htmlFor="password">
                                Birthdate
                              </FormLabel>
                              <Field
                                as={Input}
                                type="date"
                                name="birthdate"
                                variant="outline"
                              />
                              <ErrorMessage
                                component="div"
                                name="birthdate"
                                style={{ color: "red" }}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel htmlFor="password">Gender</FormLabel>
                              <Field
                                as={Select}
                                placeholder="Gender"
                                name="gender"
                              >
                                <option value="Male">Laki-laki</option>
                                <option value="Female">Perempuan</option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                name="gender"
                                style={{ color: "red" }}
                              />
                            </FormControl>
                          </VStack>
                          <HStack w="50vw" justify="space-between" mt="10">
                            <Text
                              fontWeight="bold"
                              _hover={{ cursor: "pointer" }}
                              onClick={() => setOpen(false)}
                            >
                              Batalkan
                            </Text>
                            <Button
                              colorScheme="teal"
                              variant="outline"
                              w="8vw"
                              // onClick={() => onEdit(user.id)}
                              type="submit"
                            >
                              Edit
                            </Button>
                          </HStack>
                        </Form>
                      </>
                    );
                  }}
                </Formik>
              ) : null}
            </Box>
          </Flex>
        )}
      </Center>
    </>
  );
}

export default ProfileSetting;
