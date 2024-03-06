import { ChatIcon, CheckCircleIcon, EmailIcon, StarIcon, WarningIcon } from "@chakra-ui/icons";
import { List, ListIcon, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs, Grid, Box, Image, Text, Flex } from "@chakra-ui/react";
import EventPost from "./EventPost";
import { FcLike } from "react-icons/fc";
import useGetUserEvents from "../../hooks/useGetUserEvents";

const ProfileBody = () => {

  const { isLoading, events } = useGetUserEvents();

  const noEventsFound = !isLoading && events.length === 0;
  if (noEventsFound) return <NoEventsFound />


  return (
    <Tabs mt='40px' p='20px' colorScheme='purple' variant='enclosed'>
      <TabList>
        <Tab _selected={{ color: 'white', bg: 'purple.400' }} >Your Events</Tab>
        <Tab _selected={{ color: 'white', bg: 'purple.400' }} >Liked Event</Tab>
      </TabList>

      <TabPanels>

        <TabPanel>
          <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={1} columnGap={1}>

            {!isLoading && (
              <>
                {events.map((event) => (
                  <EventPost event={event} key={event.id} />
                ))}
              </>
            )}

          </Grid>
        </TabPanel>

        <TabPanel>
          <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={1} columnGap={1}>

            <Box position="relative" maxW="400px">
              <Image src="/img/yoshi.png" alt="Image" />
              <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bg="rgba(0, 0, 0, 0.5)" // Semi-transparent black overlay
                textAlign="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <FcLike size={40} />
              </Box>
            </Box>

          </Grid>
        </TabPanel>

      </TabPanels>
    </Tabs>
  )
}

export default ProfileBody


const NoEventsFound = () => {
  return (
    <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Events Found🤔</Text>
    </Flex>
  );
};