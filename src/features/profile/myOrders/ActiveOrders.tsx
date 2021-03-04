﻿import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import { Box, Divider, Table, Tr, Thead, Th, Tbody, Td, HStack, Image, Button } from "@chakra-ui/react";
import rootStoreContext from "../../../application/stores/rootstore";
import Loader from "../../../application/appLayout/FullPageSpinner";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

const ActiveOrders = () => {
    const {getAllOrders, loadingOrders, activeOrders} = useContext(rootStoreContext).orderStore;
    useEffect(() => {
        getAllOrders("ACTIVE");
    }, [getAllOrders])
    if(loadingOrders || activeOrders === null) return <Loader />
    return (
        <Box className="task__bid__form__card no__padding">
            <Box p="1em">
                <p className="text__darker text__upper text__bold">Active orders</p>
            </Box>
            <Divider mb={0} />
            {activeOrders.length > 0 ? (
                <Box className="watchlist__table small__heading">
                <Table size="md">
                    <Thead >
                        <Tr>
                            <Th ></Th>
                            <Th className="watchlist__heading">ORDER DATE</Th>
                            <Th className="watchlist__heading">DUE ON</Th>
                            <Th className="watchlist__heading">PAID ON</Th>
                            <Th className="watchlist__heading">TOTAL</Th>
                            <Th className="watchlist__heading">ACTION</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {activeOrders.map((order) => (
                            <Tr className="hover__secondary" key={order.orderNumber}>
                                <Td>
                                    <HStack spacing="20px">
                                        <Image src={order.job.photos[0].url} alt="job-photo" width="45px" height="32px" />
                                        <Box style={{lineHeight: "2em"}}>
                                            <Link  to={`/task/${order.job.id}`} className="text__darker link truncate__2">{order.job.title}</Link>
                                            <Link to={`/order/${order.orderNumber}`} className="text__blue link">#{order.orderNumber}</Link>
                                        </Box>
                                    </HStack>
                                </Td>
                                <Td>
                                    {dayjs(order.orderCompletedDate).format("MMM DD, YYYY")}
                                </Td>
                                <Td>
                                    {dayjs(order.paymentCompletedDate).format("MMM DD, YYYY")}
                                </Td>
                                <Td>
                                    {dayjs(order.job.deliveryDate).format("MMM DD, YYYY")}
                                </Td>
                                <Td>
                                    ${order.totalAmount}
                                </Td>
                                <Td>
                                    <Button as={Link} to={`/order/${order.orderNumber}`} className="btn btn__nm btn__primary">View</Button>
                                </Td>
                            </Tr>
                        ))} 
                    </Tbody>
                  
                </Table>
            </Box>
                ) : (
                    <Box p="1em">
                        <p className="text__darker">There are no active orders to show</p>
                    </Box>
            )
            }
        </Box>
    )
}

export default observer(ActiveOrders);