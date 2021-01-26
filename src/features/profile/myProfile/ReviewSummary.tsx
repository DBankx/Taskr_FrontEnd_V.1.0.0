import React from "react";
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import Rater from "../../../application/common/Rater";

const ReviewSummary = () => {
    return (
        <div>
            <Tabs isFitted isLazy>
                <TabList className="profile__review__summary__tab">
                        <Tab>As a taskr</Tab>
                        <Tab>As a Runner</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box style={{textAlign: "right", width: "170px"}}>
                            <Rater justifyContent="flex-end" rating={4} boxSize={7} />
                            <p className="text__silent">4 stars from 200 reviews</p>
                            <small className="text__blue">121 completed tasks</small>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box style={{width: "170px"}}>
                            <p className="text__silent text__italic text__sm">This guy hasn&apos;t recieved any reviews as a poster just yet.</p>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default observer(ReviewSummary);