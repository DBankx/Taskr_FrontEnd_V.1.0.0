import React from "react";
import {Box, Divider, Grid, HStack, Skeleton, SkeletonCircle} from "@chakra-ui/react";

const ProfileTaskPlaceholder = () => {
    return (
        <Box>
            <Skeleton mb={5} width="150px" height="20px" />
            <Grid templateColumns={{xl: "repeat(3, 1fr)", lg: "repeat(3, 1fr)", md: "repeat(2, 1fr)", sm:"1fr"}} gap={7}>
                <Box className="task__bid__form__card" style={{marginBottom: "0", padding: "0", borderRadius: "0", position: "relative"}}>
                   <Skeleton height="158px" />
                    <Box style={{padding: "10px 15px"}}>
                        <HStack spacing="10px">
                            <SkeletonCircle width="30px" height="30px" />
                            <Skeleton width="80%" height="20px" />
                        </HStack>
                        <Box mt={4}>
                            <Skeleton height="20px" />
                        </Box>

                        <Box mt={4}>
                            <Skeleton mb={3} height="10px" width="100px" />
                            <Skeleton height="10px" width="100px" />
                        </Box>
                    </Box>
                    <Divider mt={2} mb={1} />
                    <Box style={{padding: "5px 15px"}}>
                        <HStack justifyContent="space-between">
                            <Skeleton height="20px" width="100px" />
                            <Skeleton height="20px" width="100px" />
                        </HStack>
                    </Box>
                </Box>
                <Box className="task__bid__form__card" style={{marginBottom: "0", padding: "0", borderRadius: "0", position: "relative"}}>
                    <Skeleton height="158px" />
                    <Box style={{padding: "10px 15px"}}>
                        <HStack spacing="10px">
                            <SkeletonCircle width="30px" height="30px" />
                            <Skeleton width="80%" height="20px" />
                        </HStack>
                        <Box mt={4}>
                            <Skeleton height="20px" />
                        </Box>

                        <Box mt={4}>
                            <Skeleton mb={3} height="10px" width="100px" />
                            <Skeleton height="10px" width="100px" />
                        </Box>
                    </Box>
                    <Divider mt={2} mb={1} />
                    <Box style={{padding: "5px 15px"}}>
                        <HStack justifyContent="space-between">
                            <Skeleton height="20px" width="100px" />
                            <Skeleton height="20px" width="100px" />
                        </HStack>
                    </Box>
                </Box>
                <Box className="task__bid__form__card" style={{marginBottom: "0", padding: "0", borderRadius: "0", position: "relative"}}>
                    <Skeleton height="158px" />
                    <Box style={{padding: "10px 15px"}}>
                        <HStack spacing="10px">
                            <SkeletonCircle width="30px" height="30px" />
                            <Skeleton width="80%" height="20px" />
                        </HStack>
                        <Box mt={4}>
                            <Skeleton height="20px" />
                        </Box>

                        <Box mt={4}>
                            <Skeleton mb={3} height="10px" width="100px" />
                            <Skeleton height="10px" width="100px" />
                        </Box>
                    </Box>
                    <Divider mt={2} mb={1} />
                    <Box style={{padding: "5px 15px"}}>
                        <HStack justifyContent="space-between">
                            <Skeleton height="20px" width="100px" />
                            <Skeleton height="20px" width="100px" />
                        </HStack>
                    </Box>
                </Box>
            </Grid>
        </Box>
)
}

export default ProfileTaskPlaceholder;