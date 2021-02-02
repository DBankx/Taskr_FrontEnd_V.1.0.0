import { Box, HStack, SkeletonCircle, Skeleton, Divider } from "@chakra-ui/react";
import React from "react";

const NotificationsPlaceholder = () => {
    return (
        <Box style={{width: "400px"}}>
            <Box p="1em">
                <HStack spacing="10px">
                <SkeletonCircle size="20" />
                <div style={{width: "100%"}}>
                    <Skeleton height="15px" width="100%" mb="1.5em" />
                    <Skeleton height="15px" width="70%" />
                </div>
                </HStack>
            </Box>
            <Divider />
            <Box p="1em">
                <HStack spacing="10px">
                    <SkeletonCircle size="20" />
                    <div style={{width: "100%"}}>
                        <Skeleton height="15px" width="100%" mb="1.5em" />
                        <Skeleton height="15px" width="70%" />
                    </div>
                </HStack>
            </Box>
            <Divider />
            <Box p="1em">
                <HStack spacing="10px">
                    <SkeletonCircle size="20" />
                    <div style={{width: "100%"}}>
                        <Skeleton height="15px" width="100%" mb="1.5em" />
                        <Skeleton height="15px" width="70%" />
                    </div>
                </HStack>
            </Box>
            <Divider />
            <Box p="1em">
                <HStack spacing="10px">
                    <SkeletonCircle size="20" />
                    <div style={{width: "100%"}}>
                        <Skeleton height="15px" width="100%" mb="1.5em" />
                        <Skeleton height="15px" width="70%" />
                    </div>
                </HStack>
            </Box>
            <Divider />
            <Box p="1em">
                <HStack spacing="10px">
                    <SkeletonCircle size="20" />
                    <div style={{width: "100%"}}>
                        <Skeleton height="15px" width="100%" mb="1.5em" />
                        <Skeleton height="15px" width="70%" />
                    </div>
                </HStack>
            </Box>
            <Divider />
            <Box p="1em">
                <HStack spacing="10px">
                    <SkeletonCircle size="20" />
                    <div style={{width: "100%"}}>
                        <Skeleton height="15px" width="100%" mb="1.5em" />
                        <Skeleton height="15px" width="70%" />
                    </div>
                </HStack>
            </Box>
        </Box>
    )
}

export default NotificationsPlaceholder;