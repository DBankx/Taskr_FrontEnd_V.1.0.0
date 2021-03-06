import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import { Box, Divider, Table, Tr, Thead, Th, Tbody, Td, HStack, Image, Button, Tooltip } from "@chakra-ui/react";
import rootStoreContext from "../../../application/stores/rootstore";
import Loader from "../../../application/appLayout/FullPageSpinner";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

const RunnerOrders = () => {
    const {getAllOrders, loadingOrders, runnerOrders} = useContext(rootStoreContext).orderStore;
    useEffect(() => {
        getAllOrders("RUNNER");
    }, [getAllOrders])
    if(loadingOrders || runnerOrders === null) return <Loader />
    return (
        <Box className="task__bid__form__card no__padding">
            <HStack spacing="10px" p="1em">
                <p className="text__darker text__upper text__bold">Runner orders</p>
                <Tooltip hasArrow style={{background: "rgb(41, 43, 50)", fontSize: "0.8em"}} label="These are orders that have been paid and assigned to you to complete" aria-label="A tooltip">
                    <Box className="circle-question">?</Box>
                </Tooltip>
            </HStack>
            <Divider mb={0} />
            {runnerOrders.length > 0 ? (
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
                            {runnerOrders.map((order) => (
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
                    <p className="text__darker">There are no runner orders to show</p>
                </Box>
            )
            }
        </Box>
    )
}

export default observer(RunnerOrders);