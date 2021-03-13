import React, {useContext} from "react";
import {IOrder} from "../../infrastructure/models/order";
import {observer} from "mobx-react-lite";
import {
    Alert,
    AlertIcon,
    Badge,
    Box,
    Button,
    Center,
    HStack,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    VStack
} from "@chakra-ui/react";
import {OrderStatus} from "../../infrastructure/enums/orderStatus";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import rootStoreContext from "../../application/stores/rootstore";
import {PadLockIcon} from "../../infrastructure/icons/Icons";

interface IProps{
    order: IOrder;
    showBox: boolean;
}

const OrderDetails = ({order, showBox}: IProps) => {
    const {confirmingOrder, markOrderAsStarted, loadingOrderAction, rejectPayout, requestPayout, acceptPayout} = useContext(rootStoreContext).orderStore;
    return (
        <Box className={showBox ? "task__bid__form__card" : ""} mt={showBox ? "3.8em" : ""}>
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
                {order.isRunner &&
                <HStack mb={3} alignItems="center" justifyContent="space-between">
                    <p className="text__silent">You&apos;ll recieve</p>
                    <p className="text__darker">${order.totalAmount - 5.50}</p>
                </HStack>
                }
                <HStack mb={3}  alignItems="center" justifyContent="space-between">
                    <p className="text__silent">Order number</p>
                    <p className="text__darker">#{order.orderNumber}</p>
                </HStack>
            </Box>
            {order.isRunner ? order.status === OrderStatus.Started ? 
                <Box mt={7}>
                <Button isLoading={loadingOrderAction} onClick={() => requestPayout(order.orderNumber)} disabled={!order.payTo.hasActiveBankAccount}  className="btn btn__nm btn__green btn__full-width">
                Request payout
            </Button>
                    <Center mt={2}>
                        {order.payTo.hasActiveBankAccount ? <p className="text__silent"><PadLockIcon boxSize="16px" /> Secure Payment</p> : <small className="form__error">You havent added a bank account to get paid</small>}
                    </Center>
                </Box>
                    : order.isRunner && order.status === OrderStatus.Completed ? (
                        <Box>
                            <p></p>
                        </Box>
                ) :  <Button isLoading={confirmingOrder} onClick={() => markOrderAsStarted(order.orderNumber)} mt={7} className="btn btn__nm btn__primary btn__full-width">
               Mark as started 
            </Button> : order.status === OrderStatus.AwaitingPayout ? (
                <VStack spacing="1em">
                    <Button isLoading={loadingOrderAction} onClick={() => acceptPayout(order.orderNumber)} mt={7} className="btn btn__nm btn__green btn__full-width">
                        Accept payout
                    </Button>
                    <Button isLoading={loadingOrderAction} onClick={() => rejectPayout(order.orderNumber)}  mt={7} className="btn btn__nm btn__error btn__full-width">
                       Reject Payout 
                    </Button>
                </VStack>
            ) : order.status === OrderStatus.Confirmed || order.status === OrderStatus.Started ? (<Box>
                <Button disabled={order.status === OrderStatus.Started} mt={7} className="btn btn__nm btn__error btn__full-width">
                Cancel order
            </Button>
                    {order.status === OrderStatus.Started && <Center mt={3}>
                        <small className="text__silent">You can&apos;t cancel an order that has been started</small>
                    </Center>} 
            </Box>)
                :(
                    <Alert status="success" variant="left-accent">
                        <AlertIcon/>
                       Order is complete 
                    </Alert>
                )
                }
        </Box>
    )
}

export default observer(OrderDetails);