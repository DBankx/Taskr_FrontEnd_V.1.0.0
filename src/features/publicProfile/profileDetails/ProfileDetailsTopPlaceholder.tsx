import { Box, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import React from "react";

const ProfileDetailsTopPlaceholder = () => {
    return (
        <Box className="task__bid__form__card">
            <Box className="text__middle">
                <SkeletonCircle style={{margin: "0 auto"}} size="130px" />
                <Skeleton mt={5} height="20px" />
                <Skeleton mt={5} height="20px" />
                <Skeleton mt={5} height="20px" />
            </Box>
        </Box>
    )
}

export default ProfileDetailsTopPlaceholder;