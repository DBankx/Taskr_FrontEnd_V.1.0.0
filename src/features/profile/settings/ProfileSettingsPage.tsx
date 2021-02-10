import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import { Box, SimpleGrid, Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react";
import AccountTab from "./account/AccountTab";
import rootStoreContext from "../../../application/stores/rootstore";
import Loader from "../../../application/appLayout/FullPageSpinner";
import BillingInformation from "./billing/BillingInformation";
import SecurityTab from "./security/SecurityTab";

const ProfileSettingsPage = () => {
    const {user} = useContext(rootStoreContext).authStore;
    const {privateProfile, getPrivateProfile, loadingInitial} = useContext(rootStoreContext).profileStore;
    useEffect(() => {
        if(privateProfile === null){
            getPrivateProfile();
        }
    }, [getPrivateProfile, privateProfile])
    if(loadingInitial || privateProfile === null) return <Loader />
    return (
        <Box className="settings__container">
            <Box className="main">
                <Tabs isLazy>
                <SimpleGrid templateColumns={{xl: "0.5fr 2fr", lg: "0.5fr 2fr", md: "0.8fr 2fr", sm: "1fr"}} spacing="2em">
             <Box>
                 <TabList className="settings__tab__list">
                     <Tab>Account</Tab>
                     <Tab>Billing Information</Tab>
                     <Tab>Security</Tab>
                     <Tab>Other</Tab>
                 </TabList>
             </Box>
                    <Box>
                      <TabPanels>
                          <TabPanel className="settings__tab__panel"><AccountTab user={user!} privateProfile={privateProfile} /></TabPanel>
                          <TabPanel className="settings__tab__panel"><BillingInformation user={user!} privateProfile={privateProfile} /></TabPanel>
                          <TabPanel className="settings__tab__panel"><SecurityTab user={user!} privateProfile={privateProfile} /></TabPanel>
                          <TabPanel className="settings__tab__panel">apple</TabPanel>
                      </TabPanels>  
                    </Box>
                </SimpleGrid>
                </Tabs>
            </Box>
        </Box>
    )
}

export default observer(ProfileSettingsPage);