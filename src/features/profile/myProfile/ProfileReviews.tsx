import React from "react";
import {observer} from "mobx-react-lite";
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery} from "@chakra-ui/react";
import TaskrReviews from "./reviews/TaskrReviews";

const ProfileReviews = () => {
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    return (
        <div>
            <h1 className="text__lg text__darker">Reviews <span className="text__silent">(2,860)</span></h1>
            <Tabs isFitted={isMobile} isLazy>
                <TabList style={isMobile ? {width: "100px"} : {margin: "0 auto"}} className="profile__inner__tabs profile__review__tabs">
                    <Tab>As a Taskr</Tab>
                    <Tab>As a Runner</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Box className="task__bid__form__card">
                           <TaskrReviews /> 
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default observer(ProfileReviews);