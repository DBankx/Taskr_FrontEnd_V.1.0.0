import React from "react";
import {observer} from "mobx-react-lite";
import {Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery} from "@chakra-ui/react";
import SEO from "../../../application/appLayout/SEO";
import ProfileTasksPane from "./ProfileTasksPane";
import {TaskStatus} from "../../../infrastructure/enums/taskStatus";

const TaskTab = () => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    return (
        <div className="container">
            <SEO title="My tasks" />
            <div className="main">
                <div>
                    <Tabs isFitted={isMobile} isLazy>
                        <TabList style={isMobile ? {width: "100px"} : {margin: "0 auto"}} className="profile__inner__tabs">
                            <Tab>Active</Tab>
                            <Tab>Assigned</Tab>
                            <Tab>Completed</Tab>
                            <Tab>In-active</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <ProfileTasksPane taskStatus={TaskStatus.Active} />
                            </TabPanel>
                            <TabPanel>
                                <ProfileTasksPane taskStatus={TaskStatus.Assigned} />
                            </TabPanel>
                            <TabPanel>
                                <ProfileTasksPane taskStatus={TaskStatus.Completed} />
                            </TabPanel>
                            <TabPanel>
                                <ProfileTasksPane taskStatus={TaskStatus.InActive} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default observer(TaskTab);