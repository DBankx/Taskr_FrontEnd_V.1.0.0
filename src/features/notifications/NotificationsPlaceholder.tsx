import {Box, SkeletonCircle, Skeleton, Divider, SimpleGrid} from "@chakra-ui/react";
import React from "react";

const NotificationsPlaceholder = () => {
    return (
        <Box style={{width: "inherit"}}>
                    <SimpleGrid alignItems="flex-start" templateColumns="0.3fr 1.4fr" className="notification__item" spacing="10px">
                        <SkeletonCircle width="60px" height="60px" />
                <div style={{width: "100%"}}>
                    <Skeleton height="15px" width="100%" mb="1em" />
                    <Skeleton height="15px" width="70%" />
                </div>
                    </SimpleGrid>
            <Divider />
            <SimpleGrid alignItems="flex-start" templateColumns="0.3fr 1.4fr" className="notification__item" spacing="10px">
                <SkeletonCircle width="60px" height="60px" />
                <div style={{width: "100%"}}>
                    <Skeleton height="15px" width="100%" mb="1em" />
                    <Skeleton height="15px" width="70%" />
                </div>
            </SimpleGrid>
            <Divider />
            <SimpleGrid alignItems="flex-start" templateColumns="0.3fr 1.4fr" className="notification__item" spacing="10px">
                <SkeletonCircle width="60px" height="60px" />
                <div style={{width: "100%"}}>
                    <Skeleton height="15px" width="100%" mb="1em" />
                    <Skeleton height="15px" width="70%" />
                </div>
            </SimpleGrid>
            <Divider />
            <SimpleGrid alignItems="flex-start" templateColumns="0.3fr 1.4fr" className="notification__item" spacing="10px">
                <SkeletonCircle width="60px" height="60px" />
                <div style={{width: "100%"}}>
                    <Skeleton height="15px" width="100%" mb="1em" />
                    <Skeleton height="15px" width="70%" />
                </div>
            </SimpleGrid>
        </Box>
    )
}

export default NotificationsPlaceholder;