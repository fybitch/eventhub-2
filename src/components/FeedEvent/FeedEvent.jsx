import { Box, Card, Divider, Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'

const FeedEvent = ({ id, img, title, description }) => {
  return (
    
      <Card bg='white' variant='ghost' position={"relative"} aspectRatio={4 / 7}>
        <Image src={img} w={'100%'} h={380} objectFit={"cover"} />
        <Divider borderColor='gray.200' />

        <Flex p='4px' mb={3} >
          <Box>
            <Heading as='h3' size='sm' mb={2}>{title}</Heading>
            <Text>By {description}</Text>
          </Box>
        </Flex>
      </Card>
  )
}

export default FeedEvent