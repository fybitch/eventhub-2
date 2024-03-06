import { Box, Link, Tooltip } from '@chakra-ui/react'
import { MdEventAvailable } from 'react-icons/md'
import { Link as RouterLink } from "react-router-dom"

const Events = () => {
    return (
        <Tooltip
            hasArrow
            label={"Events"}
            placement='right'
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}>
            <Link
                display={"flex"}
                to={"/"}
                as={RouterLink}
                alignItems={"center"}
                gap={15}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
            >
                <MdEventAvailable size={25} />
                <Box display={{ base: "none", md: "block" }}>Events</Box>
            </Link>
        </Tooltip>
    )
}

export default Events