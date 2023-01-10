import React, { useState } from "react";
import {
    Slider, Button, SliderFilledTrack,
    SliderThumb, SliderTrack, Box,
    Text, Spacer, Spinner, Flex
}
    from "@chakra-ui/react";
import NavBarTenant from "../Components/NavBarTenant";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { openModal } from "../Redux/ModalSlice";
import { isDoneCreate } from "../Redux/DoneCreatePropertiesSlice";

//component untuk memenuhi page Betenant
import InputCategory from "../Components/ComponentBeTenant/InputCategory";
import InputProperty from "../Components/ComponentBeTenant/InputProperty";
import InputFasility from "../Components/ComponentBeTenant/InputFasility";
import InputRoom from "../Components/ComponentBeTenant/InputRoom";
import Opening from "../Components/ComponentBeTenant/Opening";
import Closing from "../Components/ComponentBeTenant/Closing";

function BeTenant() {
    const [currentStep, setCurrentStep] = useState(1);
    const [value, setValue] = useState(0);
    const [load, setLoad] = useState(false)
    const [pulseLoader, setPulserLoader] = useState(false)
    const navigate = useNavigate()

    //redux
    const dispatch = useDispatch()
    const isSubmitClicked = useSelector((state) => state.ButtonSlice.isSubmitClicked)

    function handleNextClick() {
        if (currentStep > 5) {
            setPulserLoader(false)
            dispatch(openModal())
            dispatch(isDoneCreate())
            const timer = setTimeout(() => {
                navigate("/")
            }, 3000);
            setPulserLoader(true)
            return () => clearTimeout(timer);
        }
        setCurrentStep(currentStep + 1);
        const timer = setTimeout(() => {
            setValue(value + 20);
        }, 1000);
        return () => clearTimeout(timer);
    }

    function handlePrevClick() {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setLoad(false)
            const timer = setTimeout(() => {
                setValue(value - 20);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (currentStep <= 1) {
            navigate("/")
        }
    }
    return (
        <Box width="auto">
            <NavBarTenant />
            {currentStep === 1 && (
                <Box marginTop="80px">
                    <Opening />
                    <Box position="fixed" zIndex={1} style={{ minWidth: "100%" }} p={0} bottom={0} bg="white">
                        <Slider aria-label='slider-ex-1' value={value}   >
                            <SliderTrack>
                                <SliderFilledTrack bg="black" transition="2s" />
                            </SliderTrack>
                            <SliderThumb transition="2s" bg="white" />
                        </Slider>
                        <Flex>
                            <Button onClick={handlePrevClick} backgroundColor="white">
                                <Text textDecoration="underline">Kembali</Text>
                            </Button>
                            <Spacer />
                            <Button onClick={handleNextClick} backgroundColor="black" marginRight="20px" marginBottom="10px" color="white" padding="25px" _hover={{ borderRadius: "10px" }}>Berikutnya</Button>
                        </Flex>
                    </Box>
                </Box>
            )}
            {currentStep === 2 && (
                <Box marginTop="10px">
                    <InputFasility />
                    <Box position="fixed" zIndex={1} style={{ minWidth: "100%" }} p={0} bottom={0} bg="white">
                        <Slider aria-label='slider-ex-1' value={value}   >
                            <SliderTrack>
                                <SliderFilledTrack bg="black" transition="2s" />
                            </SliderTrack>
                            <SliderThumb transition="2s" bg="white" />
                        </Slider>
                        <Flex>
                            <Button onClick={handlePrevClick} backgroundColor="white">
                                <Text textDecoration="underline">Kembali</Text>
                            </Button>
                            <Spacer />
                            <Button onClick={handleNextClick} backgroundColor="black" marginRight="20px"
                                isDisabled={!isSubmitClicked} style={{ opacity: isSubmitClicked ? 1 : 0.5 }}
                                marginBottom="10px" color="white" padding="25px" _hover={{ borderRadius: "10px" }}>{load ? <Spinner color="white" /> : "Berikutnya"}</Button>
                        </Flex>
                    </Box>
                </Box>
            )}
            {currentStep === 3 && (
                <Box>
                    <InputCategory />
                    <Box position="fixed" zIndex={1} style={{ minWidth: "100%" }} p={0} bottom={0} bg="white">
                        <Slider aria-label='slider-ex-1' value={value}   >
                            <SliderTrack>
                                <SliderFilledTrack bg="black" transition="2s" />
                            </SliderTrack>
                            <SliderThumb transition="2s" bg="white" />
                        </Slider>
                        <Flex>
                            <Button onClick={handlePrevClick} backgroundColor="white">
                                <Text textDecoration="underline">Kembali</Text>
                            </Button>
                            <Spacer />
                            <Button onClick={handleNextClick} backgroundColor="black" marginRight="20px"
                                isDisabled={isSubmitClicked} style={{ opacity: isSubmitClicked ? 0.5 : 1 }}
                                marginBottom="10px" color="white" padding="25px" _hover={{ borderRadius: "10px" }}>Berikutnya</Button>
                        </Flex>
                    </Box>
                </Box>
            )}
            {currentStep === 4 && (
                <Box>
                    <InputProperty />
                    <Box position="fixed" zIndex={1} style={{ minWidth: "100%" }} p={0} bottom={0} bg="white">
                        <Slider aria-label='slider-ex-1' value={value}   >
                            <SliderTrack>
                                <SliderFilledTrack bg="black" transition="2s" />
                            </SliderTrack>
                            <SliderThumb transition="2s" bg="white" />
                        </Slider>
                        <Flex>
                            <Button onClick={handlePrevClick} backgroundColor="white">
                                <Text textDecoration="underline">Kembali</Text>
                            </Button>
                            <Spacer />
                            <Button onClick={handleNextClick} backgroundColor="black" marginRight="20px"
                                isDisabled={!isSubmitClicked} style={{ opacity: isSubmitClicked ? 1 : 0.5 }}
                                marginBottom="10px" color="white" padding="25px" _hover={{ borderRadius: "10px" }}>Berikutnya</Button>
                        </Flex>
                    </Box>
                </Box>
            )}
            {currentStep === 5 && (
                <Box marginTop="40px">
                    <InputRoom />
                    <Box position="fixed" zIndex={1} style={{ minWidth: "100%" }} p={0} bottom={0} bg="white">
                        <Slider aria-label='slider-ex-1' value={value}   >
                            <SliderTrack>
                                <SliderFilledTrack bg="black" transition="2s" />
                            </SliderTrack>
                            <SliderThumb transition="2s" bg="white" />
                        </Slider>
                        <Flex>
                            <Button onClick={handlePrevClick} backgroundColor="white">
                                <Text textDecoration="underline">Kembali</Text>
                            </Button>
                            <Spacer />
                            <Button onClick={handleNextClick} backgroundColor="black" marginRight="20px"
                                isDisabled={isSubmitClicked} style={{ opacity: isSubmitClicked ? 0.5 : 1 }}
                                marginBottom="10px" color="white" padding="25px" _hover={{ borderRadius: "10px" }}>Berikutnya</Button>
                        </Flex>
                    </Box>
                </Box>
            )}
            {currentStep === 6 && (
                <Box marginTop="80px">
                    <Closing />
                    <Box position="fixed" zIndex={1} style={{ minWidth: "100%" }} p={0} bottom={0} bg="white">
                        <Slider aria-label='slider-ex-1' value={value}   >
                            <SliderTrack>
                                <SliderFilledTrack bg="black" transition="2s" />
                            </SliderTrack>
                            <SliderThumb transition="2s" bg="white" />
                        </Slider>
                        <Flex>
                            <Button onClick={handlePrevClick} backgroundColor="white">
                                <Text textDecoration="underline">Kembali</Text>
                            </Button>
                            <Spacer />
                            <Button onClick={handleNextClick} backgroundColor="black" marginRight="20px" marginBottom="10px"
                                color="white" padding="25px" _hover={{ borderRadius: "10px" }}>{pulseLoader ? <Spinner color="white" /> : "Berikutnya"}</Button>
                        </Flex>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
export default BeTenant


