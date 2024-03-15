
import { Box, Container, Flex} from "@chakra-ui/react";
import FeedEvents from "../components/FeedEvent/FeedEvents";
import SuggestedHeader from "../components/SuggestedUsers/SuggestedHeader";
import SuggestedUsers from "../components/SuggestedUsers/SuggestedUsers";
import SuggestedUser from "../components/SuggestedUsers/SuggestedUser";


const HomePage = () => {


  return (
    <Container maxW={"container.xl"} mt={30}>
      <Flex gap={10}>
        <Box  py={10}>
          <FeedEvents/>
        </Box>
        <Box flex={3} mr={15} display={{ base: "none", lg: "block" }} maxW={"240px"}>
          <SuggestedHeader/>
          <SuggestedUsers/>
        </Box>
      </Flex>
    </Container>
  )
}

export default HomePage