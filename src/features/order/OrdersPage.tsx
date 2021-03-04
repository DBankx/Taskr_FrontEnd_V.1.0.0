import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";
import rootStoreContext from "../../application/stores/rootstore";
import Loader from "../../application/appLayout/FullPageSpinner";
import SEO from "../../application/appLayout/SEO";
import OrderDetails from "./OrderDetails";
import OrderInfo from "./orderInfo/OrderInfo";

const OrdersPage : React.FC<RouteComponentProps<{orderNumber: string}>> = ({match}) => {
    const {order, getOrderByNumber, loadingOrders} = useContext(rootStoreContext).orderStore;
    
    useEffect(() => {
        getOrderByNumber(match.params.orderNumber)
    }, [match.params.orderNumber])
    
    if(loadingOrders || order === null) return <Loader />
    
    return (
        <Box className="container">
            <SEO title="My order" />
            <Box className="main">
                <SimpleGrid spacing="20px" templateColumns={{xl: "2fr 0.8fr", lg: "2fr 1fr", md: "1fr", sm: "1fr"}}>
                    <Box>
                        <OrderInfo order={order} />
                    </Box>
                    <Box>
                        <OrderDetails showBox={true} order={order}/> 
                    </Box>
                </SimpleGrid>
            </Box>
        </Box>
    )
}

export default observer(OrdersPage);