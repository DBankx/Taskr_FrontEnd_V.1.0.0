import React from "react";
import {observer} from "mobx-react-lite";
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery} from "@chakra-ui/react";
import OrderActivity from "./OrderActivity";
import {IOrder} from "../../../infrastructure/models/order";
import OrderInfoDetails from "./OrderInfoDetails";

interface IProps{
    order: IOrder
}

const OrderInfo = ({order} : IProps) => {
    const [isMobile] = useMediaQuery("(max-width: 600px)"); 
    return (
        <Box>
            <Tabs isFitted={isMobile} className="order__info__tabs"  isLazy>
                <TabList>
                    <Tab>Activity</Tab>
                    <Tab>Details</Tab>
                    <Tab>Delivery</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <OrderActivity order={order} />
                    </TabPanel>
                    <TabPanel>
                        <OrderInfoDetails order={order} />
                    </TabPanel>
                </TabPanels>
            </Tabs>  
        </Box>
    )
}

export default observer(OrderInfo);