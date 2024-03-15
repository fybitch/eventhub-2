import { Box, Card, Divider, Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { CiSaveDown2 } from "react-icons/ci";

const FeedEvent = ({ event }) => {
  return (

    <Card bg='white' variant='ghost' position={"relative"} aspectRatio={4/6}>
      <Image src={event.imageURL} w={'100%'} h={'100%'} objectFit={"cover"} />
      <Divider borderColor='gray.200' />

      <Flex p='4px' mb={3} >
        <Flex flexDir={'column'}>
          <Flex justifyContent={'space-between'} >
            <Heading as='h3' size='sm' mb={2}>{event.title}</Heading>
            {/* <CiSaveDown2 size={35} /> */}
          </Flex>
          <Text fontSize={14}>By {event.description.slice(0, 30) + "..."}</Text>
        </Flex>
      </Flex>
    </Card>
  )
}

export default FeedEvent