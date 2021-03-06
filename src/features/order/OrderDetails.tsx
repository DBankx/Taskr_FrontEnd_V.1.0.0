import React from "react";
import {IOrder} from "../../infrastructure/models/order";
import {observer} from "mobx-react-lite";
import {Badge, Box, Button, HStack, Image, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {OrderStatus} from "../../infrastructure/enums/orderStatus";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

interface IProps{
    order: IOrder;
    showBox: boolean;
}

const OrderDetails = ({order, showBox}: IProps) => {
    return (
        <Box className={showBox ? "task__bid__form__card" : ""} mt="3.8em">
            <HStack justifyContent="space-between" alignItems="center">
            <h3 className="text__darker text__md">Order Details</h3>

                <Menu isLazy={true} closeOnSelect={false}>
                    <MenuButton as={Button} className="btn__white">
                       <HStack className="text__silent" spacing="3px">
                           <p>•</p>
                           <p>•</p>
                           <p>•</p>
                       </HStack> 
                    </MenuButton>
                    <MenuList>
                        {order.status === OrderStatus.Confirmed && <MenuItem>
                           Cancel order
                       </MenuItem> }
                       <MenuItem>
                           Contact Seller
                       </MenuItem>
                        <MenuItem>
                            View FAQ&apos;s
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <Box mt={3}>
                <HStack spacing="10px">
                    <Image src={order.job.photos[0].url} alt="job-photo" width="100px" height="60px" className="order__job__photo" />
                    <Box>
                        <Link to={`/task/${order.job.id}`} className="text__darker link truncate__1">{order.job.title}</Link>
                        
                        <Box style={{verticalAlign: "end"}}>
                        {order.status === OrderStatus.Completed ? <Badge colorScheme="green">Completed</Badge> : order.status === OrderStatus.AwaitingPayout ? <Badge colorScheme="facebook">Awaiting payout</Badge> : order.status === OrderStatus.Cancelled ? <Badge colorScheme="red">Ended</Badge> : <Badge colorScheme="orange">Pending</Badge>}
                        </Box>
                    </Box>
                </HStack>
            </Box>
            
            <Box mt={7}>
                    <HStack mb={3} alignItems="center" justifyContent="space-between">
                        <p className="text__silent">{order.isRunner ? "Taskr" : "Assinged Runner"}</p>
                        <HStack spacing="5px">
                            <Image src={order.isRunner ? order.user.avatar : order.payTo.avatar} alt="runner-avatar" width="20px" height="20px" className="avatar" />
                        <Link className="link text__blue" to={`/public-profile/${order.isRunner ? order.user.id : order.payTo.id}`}>{order.isRunner ? order.user.username : order.payTo.username}</Link>
                        </HStack>
                    </HStack>
                <HStack mb={3}  alignItems="center" justifyContent="space-between">
                    <p className="text__silent">Delivery Date</p>
                    <p className="text__darker">{dayjs(order.job.deliveryDate).format("MMM DD, hh:mm A")}</p>
                </HStack>
                <HStack mb={3}  alignItems="center" justifyContent="space-between">
                    <p className="text__silent">Total price</p>
                    <p className="text__darker">${order.totalAmount}</p>
                </HStack>
                <HStack mb={3}  alignItems="center" justifyContent="space-between">
                    <p className="text__silent">Order number</p>
                    <p className="text__darker">#{order.orderNumber}</p>
                </HStack>
            </Box>
            {order.isRunner ? <Button mt={7} className="btn btn__nm btn__primary btn__full-width">
               Mark as started 
            </Button> : <Button mt={7} className="btn btn__nm btn__error btn__full-width">
                Cancel order
            </Button> }
        </Box>
    )
}

export default observer(OrderDetails);