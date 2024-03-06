import { Box, Button, Flex, Heading, Link, Tooltip } from "@chakra-ui/react"
import { BiLogOut } from "react-icons/bi"
import SidebarItems from "./SidebarItems";
import useLogout from "../../hooks/useLogout";

const Sidebar = () => {

  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 1, md: 8 }}

    >
      <Heading >EventHub</Heading>

      <Flex direction={"column"} gap={5} w='full' height={"full"} justifyContent={'flex-end'}>
        <SidebarItems />
        {/* Logout */}

        <Tooltip
          hasArrow
          label={"Logout"}
          placement='right'
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "blue.300" }}
            p={2}
            borderRadius={6}
            w={{ base: 10, md: "full" }}
            mb={10}
            justifyContent={{ base: "center", md: "flex-start" }}

          >

            <BiLogOut size={25} />
            <Button display={{ base: "none", md: "block" }} variant={"ghost"} _hover={{ bg: "transparent" }}
              isLoading={isLoggingOut}
            >
              Logout
            </Button>

          </Flex>
        </Tooltip>



      </Flex>
    </Box>
  )
}

export default Sidebar