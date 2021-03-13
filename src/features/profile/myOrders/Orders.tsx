import React from "react";
import {observer} from "mobx-react-lite";
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery} from "@chakra-ui/react";
import SEO from "../../../application/appLayout/SEO";
import ActiveOrders from "./ActiveOrders";
import RunnerOrders from "./RunnerOrders";
import PayoutOrders from "./PayoutOrders";
import CompletedOrders from "./CompletedOrders";

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
                      <Tab>Runner</Tab>
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
                      <TabPanel>
                          <RunnerOrders />
                      </TabPanel>
                      <TabPanel>
                          <PayoutOrders />
                      </TabPanel>
                      <TabPanel>
                          <CompletedOrders />
                      </TabPanel>
                  </TabPanels>
              </Tabs>
            </Box>
        </Box>
    )
}

export default observer(Orders);