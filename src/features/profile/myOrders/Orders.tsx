import React from "react";
import {observer} from "mobx-react-lite";
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery} from "@chakra-ui/react";
import SEO from "../../../application/appLayout/SEO";
import ActiveOrders from "./ActiveOrders";

const Orders = () => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    return (
        <Box className="container">
            <SEO title="My Orders" />
            <Box className="main">
              <Tabs isFitted={isMobile} isLazy>
                  <TabList style={isMobile ? {width: "100px"} : {margin: "0 auto"}} className="profile__inner__tabs">
                      {/*confirmed*/}
                      <Tab>Active</Tab>
                      {/*Awaiting payout*/}
                      <Tab>Awaiting Payout</Tab>
                      {/*Completed*/}
                      <Tab>Completed</Tab>
                      {/*Cancelled*/}
                      <Tab>Cancelled</Tab>
                  </TabList>
                  
                  <TabPanels>
                      <TabPanel>
                          <ActiveOrders />
                      </TabPanel>
                  </TabPanels>
              </Tabs>
            </Box>
        </Box>
    )
}

export default observer(Orders);