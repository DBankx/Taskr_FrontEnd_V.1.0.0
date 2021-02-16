import {Box, StackDivider, HStack, Skeleton, SkeletonCircle, SimpleGrid, VStack, useMediaQuery} from "@chakra-ui/react";
import React from "react";

const ChatsPlaceholder = () => {
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    return (
        <Box className="container">
        <Box className="task__bid__form__card">
            <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={9}
                align="stretch"
            >
                <Box>
                <HStack alignItems="center" spacing="30px" width="100%">
                    {!isMobile && <Skeleton width="20px" height="20px" />}
                    <Box width="100%">
                        <SimpleGrid templateColumns="0.1fr 2fr" spacing="15px" width="100%">
                            <SkeletonCircle width="80px" height="80px" />
                            <Box width="100%">
                                <Skeleton mb={"17.5px"} width="50%" height="15px" />
                                <Skeleton mb={"17.5px"} width="100%" height="15px" />
                                <Skeleton width="30%" height="15px" />
                            </Box>
                        </SimpleGrid>
                    </Box>
                    <Box height="inherit">
                        <Skeleton width="40px" height="15px" />
                    </Box>
                </HStack>
                </Box>
                <Box>
                    <HStack alignItems="center" spacing="30px" width="100%">
                        {!isMobile && <Skeleton width="20px" height="20px" />}
                        <Box width="100%">
                            <SimpleGrid templateColumns="0.1fr 2fr" spacing="15px" width="100%">
                                <SkeletonCircle width="80px" height="80px" />
                                <Box width="100%">
                                    <Skeleton mb={"17.5px"} width="50%" height="15px" />
                                    <Skeleton mb={"17.5px"} width="100%" height="15px" />
                                    <Skeleton width="30%" height="15px" />
                                </Box>
                            </SimpleGrid>
                        </Box>
                        <Box height="inherit">
                            <Skeleton width="40px" height="15px" />
                        </Box>
                    </HStack>
                </Box>
                <Box>
                    <HStack alignItems="center" spacing="30px" width="100%">
                        {!isMobile && <Skeleton width="20px" height="20px" />}
                        <Box width="100%">
                            <SimpleGrid templateColumns="0.1fr 2fr" spacing="15px" width="100%">
                                <SkeletonCircle width="80px" height="80px" />
                                <Box width="100%">
                                    <Skeleton mb={"17.5px"} width="50%" height="15px" />
                                    <Skeleton mb={"17.5px"} width="100%" height="15px" />
                                    <Skeleton width="30%" height="15px" />
                                </Box>
                            </SimpleGrid>
                        </Box>
                        <Box height="inherit">
                            <Skeleton width="40px" height="15px" />
                        </Box>
                    </HStack>
                </Box>
                <Box>
                    <HStack alignItems="center" spacing="30px" width="100%">
                        {!isMobile && <Skeleton width="20px" height="20px" />}
                        <Box width="100%">
                            <SimpleGrid templateColumns="0.1fr 2fr" spacing="15px" width="100%">
                                <SkeletonCircle width="80px" height="80px" />
                                <Box width="100%">
                                    <Skeleton mb={"17.5px"} width="50%" height="15px" />
                                    <Skeleton mb={"17.5px"} width="100%" height="15px" />
                                    <Skeleton width="30%" height="15px" />
                                </Box>
                            </SimpleGrid>
                        </Box>
                        <Box height="inherit">
                            <Skeleton width="40px" height="15px" />
                        </Box>
                    </HStack>
                </Box>
                <Box>
                    <HStack alignItems="center" spacing="30px" width="100%">
                        {!isMobile && <Skeleton width="20px" height="20px" />}
                        <Box width="100%">
                            <SimpleGrid templateColumns="0.1fr 2fr" spacing="15px" width="100%">
                                <SkeletonCircle width="80px" height="80px" />
                                <Box width="100%">
                                    <Skeleton mb={"17.5px"} width="50%" height="15px" />
                                    <Skeleton mb={"17.5px"} width="100%" height="15px" />
                                    <Skeleton width="30%" height="15px" />
                                </Box>
                            </SimpleGrid>
                        </Box>
                        <Box height="inherit">
                            <Skeleton width="40px" height="15px" />
                        </Box>
                    </HStack>
                </Box>
            </VStack>
        </Box>
        </Box>
    )
}

export default ChatsPlaceholder;