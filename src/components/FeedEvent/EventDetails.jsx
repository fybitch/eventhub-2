import { Box, Container, Flex, Heading, Image, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const EventDetails = () => {


    return (
        <>
            <Flex gap={4} w={{ base: "90%", md: "70%" }} mx={"auto"} mt={'60px'}>
                <Box borderRadius={4} overflow={"hidden"} flex="1">
                    <Image
                        src={"/img/item.jpg"}
                        alt={"product.title"}
                        h={450}
                        w={300}
                    />
                </Box>
                <Box flex="1" py={{ base: '5', md: '50' }} pl={{ md: '5' }}>
                    <Text textTransform="uppercase" color="gray.500">{"product.category"}</Text>
                    <Heading as="h1" fontSize="2xl" mt="2">{"product.title"}</Heading>
                    <Text fontSize="lg" mt="2">
                        {"product.rating && product.rating.rate"} <i className="fa fa-star"></i>
                    </Text>
                    <Heading as="h3" fontSize="3xl" mt="4">${250}</Heading>
                    <Text fontSize="lg" mt="4">{"lorem12sdlkflsjdlfjs"}</Text>
                    <Button
                        colorScheme="dark"
                        variant="outline"
                        mt="4"
                    >
                        Add to Cart
                    </Button>
                    <Link to="/cart">
                        <Button colorScheme="dark" mx="3" mt="4">
                            Go to Cart
                        </Button>
                    </Link>
                </Box>
            </Flex>

        </>
    )
}

export default EventDetails