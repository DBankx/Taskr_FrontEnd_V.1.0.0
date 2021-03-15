import {Box, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery} from "@chakra-ui/react";
import React from "react";
import Rater from "../../../application/common/Rater";
import ReviewPane from "../../profile/myProfile/reviews/ReviewPane";

interface IProps{
    userId: string;
}

const ProfileReviews = ({userId}: IProps) => {
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    return (
        <Box style={{marginTop: "2em"}}>
            <HStack style={{marginTop: "0.5em"}} alignItems="center" spacing="10px">
                <h1 className="text__heading text__darker">Reviews</h1>
                <Rater justifyContent="flex-start" rating={4} boxSize={8} />
                <h1 className="text__heading text__darker">4.8</h1>
                <p className="text__light__grey text__heading">(2,860)</p>
            </HStack>
            <Tabs isFitted={isMobile} isLazy>
                <TabList style={isMobile ? {width: "100px"} : {margin: "0 auto"}} className="profile__inner__tabs profile__review__tabs">
                    <Tab>As a Taskr</Tab>
                    <Tab>As a Runner</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Box className="task__bid__form__card">
                            <ReviewPane userId={userId} predicate="Taskr" />
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box className="task__bid__form__card">
                            <ReviewPane userId={userId} predicate="Runner" />
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default ProfileReviews;