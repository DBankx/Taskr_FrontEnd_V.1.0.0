import React from "react";
import {observer} from "mobx-react-lite";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ActiveTasks from "./ActiveTasks";

const TaskTab = () => {
    return (
        <div className="container">
            <div className="main">
                <div>
                    <Tabs index={0} isLazy>
                        <TabList className="profile__inner__tabs">
                            <Tab>Active Tasks</Tab>
                            <Tab>In Active / Completed Tasks</Tab>
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