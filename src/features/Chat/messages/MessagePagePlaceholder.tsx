import React from "react";
import {Box, SimpleGrid, StackDivider, useMediaQuery, VStack, Skeleton, HStack, Spinner} from "@chakra-ui/react";

const MessagePagePlaceholder = () => {
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    return (
        <Box>
            <Box style={{marginTop: isMobile ? "1em" : "3em"}}>
                <SimpleGrid templateColumns={{xl: "2fr 0.8fr", lg: "2fr 1fr"}} spacing="20px" >
                    <Box>
                    <VStack
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing={0}
                        align="stretch"
                        className="task__bid__form__card no__padding message__container"
                    >
                        <Box className="message__top">
                            <HStack spacing="20px">
                                <Skeleton height="70px" width="20%" />
                                <Box style={{width: "100%"}}>
                                    <Skeleton width="80%" mb={6} height="20px" />
                                    <Skeleton width="30%" height="20px" />
                                </Box>
                            </HStack>
                        </Box>
                        <Box className="message__body">
                            <Box className="middle_position">
                                <Spinner color="brand.100" size="xl" />
                            </Box>
                        </Box>
                        <Box className="message__bottom">
                            <Box className="message__input__box">
                            <Skeleton width="100%" height="50px" />
                            </Box>
                        </Box>
                    </VStack>
                    </Box>
                    
                    <Box className="task__bid__form__card" style={{height: "fit-content"}}>
                        <Skeleton width="40%" height="20px" style={{margin: "0 auto 20px auto"}} />
                        <Skeleton width="80%" height="20px" style={{margin: "0 auto 20px auto"}} />
                        <Skeleton width="100%" height="20px" style={{margin: "0 auto 20px auto"}} />
                    </Box>
                </SimpleGrid>
            </Box>
        </Box>
    )
}

export default MessagePagePlaceholder;