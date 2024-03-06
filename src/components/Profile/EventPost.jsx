import { Flex, GridItem, Image, Text, useDisclosure, Modal, ModalContent, ModalOverlay, ModalCloseButton, ModalBody, Box, Button, Avatar, Divider, VStack, ModalHeader, ModalFooter, } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { CiCalendarDate } from "react-icons/ci";
import { ImLocation2 } from "react-icons/im";
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from "../../store/authStore"
import useShowToast from "../../hooks/useShowToast"
import { useState } from "react"
import { deleteObject, ref } from "firebase/storage"
import { firestore, storage } from "../../firebase/firebase"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"
import useEventStore from "../../store/eventStore"
import { useNavigate } from "react-router-dom";

const EventPost = ({ event }) => {


    const { isOpen, onOpen, onClose } = useDisclosure();

    const userProfile = useUserProfileStore(state => state.userProfile)
    const authUser = useAuthStore(state => state.user);
    const showToast = useShowToast();
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteEvent = useEventStore(state => state.deleteEvent);
    const decrementPostsCount = useUserProfileStore((state) => state.deleteEvent);

    const handleDeleteEvent = async () => {
        if (!window.confirm("Are you sure you want to delete this Event?")) return;
        if (isDeleting) return;

        try {
            const imageRef = ref(storage, `events/${event.id}`);
            await deleteObject(imageRef);
            const userRef = doc(firestore, 'users', authUser.uid);
            await deleteDoc(doc(firestore, 'events', event.id));

            await updateDoc(userRef, {
                events: arrayRemove(event.id)
            })

            deleteEvent(event.id)
            decrementPostsCount(event.id)
            showToast("Success", "Event deleted successfully", "success");


        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <GridItem onClick={onOpen} cursor={"pointer"} borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.300"} position={"relative"} aspectRatio={1 / 1}>
                <Flex opacity={0} _hover={{ opacity: 1 }} position={"absolute"} top={0} left={0} right={0} bottom={0} bg={"whiteAlpha.700"} transition={"all 0.3s ease"} zIndex={1} justifyContent={"center"}>
                    <Flex alignItems={"center"} gap={50}>
                        <Flex>
                            <AiFillHeart size={20} />
                            <Text fontWeight={"bold"} ml={2}>{event.likes.length}</Text>
                        </Flex>
                        <Flex>
                            <FaComment size={20} />
                            <Text fontWeight={"bold"} ml={2}>{event.registerUsers.length}</Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Image src={event.imageURL} alt="profile post" w={"100%"} h={"100%"} objectFit={"cover"} />
            </GridItem>


            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: '3xl', md: '5xl' }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody pb={5}>
                        <Flex gap={4} w={{ base: "90%", sm: "70%", md: "90%" }} mx={"auto"} maxH={'90vh'} minH={'50vh'}>
                            <Box borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.300"} flex={1.5}>
                                <Image src={event.imageURL} alt="Profile post" />
                            </Box>
                            <Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    <Flex alignItems={"center"} gap={4}>
                                        <Avatar src={userProfile.profilePicURL} size={"sm"} name="ampta" />
                                        <Text fontWeight={"bold"} fontSize={12} >
                                            {userProfile.username}
                                        </Text>
                                    </Flex>

                                    {authUser?.uid === userProfile.uid && (
                                        <Button _hover={{ bg: "whiteAlpha.300", color: "red.600" }} borderRadius={4} p={1} >
                                            <MdDelete size={20} cursor="pointer" isLoading={isDeleting} onClick={handleDeleteEvent} />
                                        </Button>
                                    )}
                                </Flex>

                                <VStack p={3} alignItems={"start"} overflowY={"auto"} >
                                    <Text fontSize={20} fontWeight={'bold'}>{event.title}</Text>
                                    <Text>{event.description}</Text>
                                </VStack>


                                <Divider my={4} bg={"gray.500"} />

                                {/* <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                    comment hai
                                </VStack> */}

                                <VStack flexDir={'row'} alignItems={"start"} justifyContent={"space-between"} mx={2}>
                                    <Flex flexDir={'column'} gap={2}>
                                        <Flex>
                                            <CiCalendarDate size={24} />
                                            <Text ml={2}>{event.date}</Text>
                                        </Flex>
                                        <Flex>
                                            <ImLocation2 size={24} />
                                            <Text ml={2}>{event.location}</Text>
                                        </Flex>
                                    </Flex>
                                    
                                    <Button color={'white'} bg={'#EC5E71'} >Book</Button>
                                </VStack>

                                <Divider my={4} bg={"gray.800"} />
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>


        </>

    )
}

export default EventPost