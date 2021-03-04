import React from "react";
import {observer} from "mobx-react-lite";
import {Box, Divider, HStack, Table, Tbody, Th, Thead, Tr, Td, useMediaQuery} from "@chakra-ui/react";
import {IOrder} from "../../../infrastructure/models/order";
import OrderDetails from "../OrderDetails";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import {FileIcon} from "../../../infrastructure/icons/Icons";

dayjs.extend(relativeTime);

interface IProps{
    order: IOrder
}

const OrderInfoDetails = ({order} : IProps) => {
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    return (
        <Box className="task__bid__form__card">
            {isMobile ? <OrderDetails showBox={false} order={order} /> : (
                <Box>
                    <HStack justifyContent="space-between" alignItems="flex-start">
                        <Box>
                        <h2 className="text__darker link truncate__1" style={{fontSize: "21px", maxWidth: "600px", display: "inline-block"}}><Link to={`/task/${order.job.id}`} >{order.job.title}</Link></h2>
                            <HStack spacing="10px">
                            <p className="text__silent text__md">Assigned to <Link className="text__blue link" to={`/public-profile/${order.payTo.id}`}>{order.payTo.username}</Link></p>
                                <Box height="30px">
                                    <Divider  orientation="vertical" />
                                </Box>
                                <p className="text__silent text__md">Due to deliver <span className="text__light__grey text__bold">{dayjs(order.job.deliveryDate).format("MMM DD, hh:mm A")}</span></p>
                            </HStack>
                        </Box>
                        <Box>
                            <p className="text__darker">TOTAL PRICE</p>
                            <p className="text__green" style={{fontSize: "21px", maxWidth: "600px", display: "inline-block", textAlign: "right"}}>${order.totalAmount}</p>
                        </Box>
                    </HStack>
                    
                    <Box mt={5} className="border__liner">
                        <p className="text__md text__silent">Order Number <span className="text__light__grey">#{order.orderNumber}</span></p>
                    </Box>
                    
                    <Box mt={8}>
                        <p className="text__darker text__bigger__md">TASK DESCRIPTION</p>
                        <Divider mb={4} mt={4} />
                        <p className="text__darker">{order.job.description}</p>
                    </Box>
                    
                    <Box mt="2em" className="white__border no__padding">
                        <Box p="0.5em" className="order__info__background" style={{borderBottom: "1px solid #E5E5E5"}}>
                            <p className="text__darker"><FileIcon boxSize={8} /> Your order <i className="order__time-stamp">{dayjs(order.orderPlacementDate).format("MMM DD, hh:mm A")}</i></p>
                           
                        </Box>
                        <Box className="watchlist__table small__heading" >
                        <Table size="md">
                            <Thead bg="#F8F9F9" >
                                <Tr  pb={2}>
                                    <Th className="watchlist__heading">TASK</Th>
                                    <Th className="watchlist__heading">DELIVERY MODE</Th>
                                    <Th className="watchlist__heading">DURATION</Th>
                                    <Th className="watchlist__heading">PRICE</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td><p className="text__darker">{order.job.title}</p></Td>
                                    <Td>{order.job.address ? <p className="text__darker">In person</p>
                                        : <p className="text__darker">Online</p>}</Td>
                                    <Td>{dayjs(Date.now()).to(order.job.deliveryDate, true)}</Td>
                                    <Td isNumeric>${order.totalAmount - 2.50}</Td>
                                </Tr>
                               
                            </Tbody>

                        </Table>
                        </Box>
                    </Box>
                </Box>
                )}
        </Box>
    )
}

export default observer(OrderInfoDetails);