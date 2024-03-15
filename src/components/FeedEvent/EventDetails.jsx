import { Box, Container, Flex, Heading, Image, Text, Button, Link, Divider, VStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure, Input } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useGetEventDetailById from '../../hooks/useGetEventDetailById';
import { ImLocation2 } from 'react-icons/im';
import { CiCalendarDate } from 'react-icons/ci';
import { useState } from 'react';


const EventDetails = () => {

    const { id } = useParams();

    const { isLoading, eventDetail } = useGetEventDetailById(id)

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputs, setInputs] = useState({
        name: "",
        age: "",
        location: "",
    });


    return (

        <>
            {!isLoading && (
                <Flex w={{ base: "90%", md: "80%" }} mx={"auto"} mt={'60px'}>
                    <Box my={{ base: '5', md: '50' }} w={'100%'} h={'450px'} borderRadius={4} overflow={"hidden"} flex="1">
                        <Image
                            src={eventDetail.imageURL}
                            alt={"event banner"}
                            w={'80%'} h={'100%'} objectFit={"cover"}
                        />
                    </Box>
                    <Box flex="1">
                        <Text textTransform="uppercase" color="gray.500">{eventDetail.title}</Text>
                        <Heading as="h1" fontSize="2xl" mt="2">{eventDetail.title}</Heading>

                        <Text fontSize="sm" mt="2">
                            {eventDetail.description}
                        </Text>



                        <Divider my={4} bg={"gray.500"} />

                        <VStack flexDir={'row'} alignItems={"start"} justifyContent={"space-between"} mx={2} >
                            <Flex flexDir={'column'} gap={2}>
                                <Flex>
                                    <CiCalendarDate size={24} />
                                    <Text ml={2}>{eventDetail.date}</Text>
                                </Flex>
                                <Flex>
                                    <ImLocation2 size={24} />
                                    <Text ml={2}>{eventDetail.location}</Text>
                                </Flex>
                            </Flex>

                            <Button color={'white'} bg={'#EC5E71'} onClick={onOpen}>Book</Button>
                        </VStack>
                    </Box>
                </Flex>
            )}

            < Modal isOpen={isOpen} onClose={onClose} size='sm' >
                <ModalOverlay />

                <ModalContent border={"1px solid gray"}>
                    <ModalHeader>Booking the event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input mb={3} placeholder='Your Name...'
                            value={inputs.name}
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                        />

                        <Input mb={3} placeholder='Your Age...'
                            value={inputs.age}
                            onChange={(e) => setInputs({ ...inputs, age: e.target.value })}
                        />

                        <Input mb={3} placeholder='Your Location...'
                            value={inputs.location}
                            onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
                        />

                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} color={'white'} bg={'#EC5E71'} >Book</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >

        </>
    )

}

export default EventDetails


const UserNotFound = () => {
    return (
        <Flex flexDir='column' textAlign={"center"} mx={"auto"}>
            <Text fontSize={"2xl"}>User Not Found</Text>
            <Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
                Go home
            </Link>
        </Flex>
    );
};