import { Box, Button, CloseButton, Flex, Image, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from "react-router-dom"
import { BsFillImageFill } from "react-icons/bs";
import { FaRegPlusSquare } from 'react-icons/fa'
import { useRef, useState } from 'react';
import usePreviewImg from '../../hooks/usePreviewImg';
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';
import useUserProfileStore from '../../store/userProfileStore';
import useEventStore from '../../store/eventStore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebase/firebase';

const CreateEvent = () => {


    const { isOpen, onOpen, onClose } = useDisclosure();
    const [caption, setCaption] = useState("");
    const [inputs, setInputs] = useState({
        title: "",
        date: "",
        location: "",
        description: "",
    });

    const imageRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const { isLoading, handleCreateEvent } = useCreateEvent();
    const showToast = useShowToast();


    const handleEventCreation = async () => {
        try {
            await handleCreateEvent(selectedFile, inputs)
            onClose();
            setInputs({
                title: "",
                date: "",
                location: "",
                description: "",
            });
            // setCaption(null);
            setSelectedFile(null);


        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }


    return (
        <>
            <Tooltip
                hasArrow
                label={"Create"}
                placement='right'
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
                    onClick={onOpen}
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "blue.300" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                >
                    <FaRegPlusSquare size={25} />
                    <Box display={{ base: "none", md: "block" }}>Create</Box>
                </Flex>
            </Tooltip>

            < Modal isOpen={isOpen} onClose={onClose} size='xl' >
                <ModalOverlay />

                <ModalContent border={"1px solid gray"}>
                    <ModalHeader>Create Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input mb={3} placeholder='Event Title...'
                            value={inputs.title}
                            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                        />

                        <Input type='date' mb={3} placeholder='Event Date...'
                            value={inputs.date}
                            onChange={(e) => setInputs({ ...inputs, date: e.target.value })}
                        />

                        <Input mb={3} placeholder='Event Location...'
                            value={inputs.location}
                            onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
                        />

                        <Textarea mb={3} placeholder='Event Description...'
                            value={inputs.description}
                            onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                        />

                        <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

                        <BsFillImageFill
                            onClick={() => imageRef.current.click()}
                            style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
                            size={16}
                        />
                        {selectedFile && (
                            <Flex mt={5} w={'full'} position={'relative'} justifyContent={'center'}>
                                <Image src={selectedFile} alt='Selected image' />
                                <CloseButton
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                    onClick={() => {
                                        setSelectedFile(null);
                                    }}
                                />
                            </Flex>
                        )}

                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={handleEventCreation} isLoading={isLoading}>Create</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >


        </>
    )
}

export default CreateEvent



function useCreateEvent() {
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const createEvent = useEventStore((state) => state.createEvent);
    const addEvent = useUserProfileStore((state) => state.addEvent);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const { pathname } = useLocation();

    const handleCreateEvent = async (selectedFile, inputs) => {
        if (isLoading) return;
        if (!selectedFile) throw new Error("Please select an image");
        setIsLoading(true);



        const newEvent = {
            title: inputs.title,
            date: inputs.date,
            location: inputs.location,
            description: inputs.description,
            likes: [],
            registerUsers: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
        };

        try {
            const eventDocRef = await addDoc(collection(firestore, "events"), newEvent);
            const userDocRef = doc(firestore, "users", authUser.uid);
            const imageRef = ref(storage, `events/${eventDocRef.id}`);

            await updateDoc(userDocRef, { events: arrayUnion(eventDocRef.id) });
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(eventDocRef, { imageURL: downloadURL });

            newEvent.imageURL = downloadURL;

            // if (userProfile.uid === authUser.uid) 
            createEvent({ ...newEvent, id: eventDocRef.id });
            addEvent({ ...newEvent, id: eventDocRef.id })

            // if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });

            showToast("Success", "Event created successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleCreateEvent };
}