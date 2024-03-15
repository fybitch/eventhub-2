import React from 'react'
import FeedEvent from './FeedEvent';
import { Box, Grid, Skeleton, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useGetFeedEvents from '../../hooks/useGetFeedEvents';

const FeedEvents = () => {


    const { isLoading, events } = useGetFeedEvents();


    return (
        <Grid templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
        }}
            gap={10}
            columnGap={10}>

            {/* {Events && Events.map(event => (
                <Link to={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
                    < FeedEvent key={event.id} id={event.id} img={event.img} title={event.title} description={event.description} />
                </Link>
            ))} */}


            {isLoading &&
                [0, 1, 2, 3, 4, 5, 6].map((_, idx) => (
                    <VStack key={idx} alignItems={"flex-start"} gap={4}>
                        <Skeleton w={"full"}>
                            <Box h='320px' aspectRatio={4 / 6}>contents wrapped</Box>
                        </Skeleton>
                    </VStack>
                ))}

            {/* {!isLoading && events.length > 0 && events.map((event) =>
                    <FeedEvent key={event.id} event={event} />
            )} */}

            {!isLoading && events.length > 0 && events.map((event) =>
                <Link to={`/events/${event.id}`}>
                    <FeedEvent key={event.id} event={event} />
                </Link>
            )}
        </Grid>


    )
}

export default FeedEvents