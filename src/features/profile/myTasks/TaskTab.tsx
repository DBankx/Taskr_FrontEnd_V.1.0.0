import React from "react";
import {observer} from "mobx-react-lite";
import {Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery} from "@chakra-ui/react";
import ActiveTasks from "./ActiveTasks";
import SEO from "../../../application/appLayout/SEO";

const TaskTab = () => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    return (
        <div className="container">
            <SEO title="My tasks" />
            <div className="main">
                <div>
                    <Tabs index={0}  isFitted={isMobile} isLazy>
                        <TabList style={isMobile ? {width: "100px"} : {margin: "0 auto"}} className="profile__inner__tabs">
                            <Tab>Active</Tab>
                            <Tab>Assigned</Tab>
                            <Tab>Completed</Tab>
                            <Tab>In-active</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <ActiveTasks />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default observer(TaskTab);