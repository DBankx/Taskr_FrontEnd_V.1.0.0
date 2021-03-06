﻿import React from "react";
import {observer} from "mobx-react-lite";
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery} from "@chakra-ui/react";
import TaskrChatTab from "./TaskrChatTab";
import RunnerChatTab from "./RunnerChatTab";
import SEO from "../../application/appLayout/SEO";

const InboxPage = () => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    return (
        <Box>
            <SEO title="My inbox" />
            <Box className="main">
                <Tabs isFitted={isMobile} isLazy>
                    <TabList style={isMobile ? {width: "100px"} : {margin: "0 auto"}} className="profile__inner__tabs">
                        <Tab>As a Taskr</Tab>
                        <Tab>As a Runner</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <TaskrChatTab />
                        </TabPanel>
                        <TabPanel>
                            <RunnerChatTab />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    )
}

export default observer(InboxPage);