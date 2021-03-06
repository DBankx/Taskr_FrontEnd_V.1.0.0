import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import { Box, Button, Divider, HStack, Image, Textarea } from "@chakra-ui/react";
import {IOrder} from "../../../infrastructure/models/order";
import {
    BoxIcon,
    ChatIcon,
    CheckmarkIcon,
    CreditCardIcon,
    FileIcon,
    RocketIcon,
    SendIcon
} from "../../../infrastructure/icons/Icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import rootStoreContext from "../../../application/stores/rootstore";

interface IProps{
    order: IOrder;
}

// TODO - do the remaining things for order activity eg. completed date

const OrderActivity = ({order} : IProps) => {
    const validationSchema = yup.object().shape({
        text: yup.string().required("message is required")
    });
    const {sendChatToRunner, startChatWithUser} = useContext(rootStoreContext).chatStore;
    
    return (
        <Box>
        <Box className="task__bid__form__card no__padding">
            <HStack spacing="20px" p="1em">
                <Box style={{backgroundColor: "#DDF0F6"}} className="order__box__icon">
                    <FileIcon boxSize={8} color="#6296D4" />
                </Box>
                
                <p className="text__md">{order.isRunner ? `${order.user.username}'s` : "Your"} order was placed <i className="order__time-stamp">{dayjs(order.orderPlacementDate).format("MMM DD, hh:mm A")}</i></p>
            </HStack>
            <Divider />
            <HStack spacing="20px" p="1em">
                <Box style={{backgroundColor: "#D7F7E9"}} className="order__box__icon">
                    <CreditCardIcon boxSize={8} color="#39C785" /> 
                </Box>

                <p className="text__md">{order.isRunner ? `${order.user.username}'s` : "Your"} payment was processed <i className="order__time-stamp">{dayjs(order.paymentCompletedDate).format("MMM DD, hh:mm A")}</i></p>
            </HStack>
            <Divider/>
            <HStack spacing="20px" p="1em">
                <Box style={{backgroundColor: "#EEECFF"}} className="order__box__icon">
                    <CheckmarkIcon boxSize={8} color="#9188E0" />
                </Box>

                <p className="text__md">{order.isRunner ? <span>{order.user.username} assigned you <i className="order__time-stamp">{dayjs(order.orderPlacementDate).format("MMM DD, hh:mm A")}</i></span> : <span> assinged your task to <Link className="link text__blue" to={`/public-profile/${order.payTo.id}`}>{order.payTo.username}</Link> <i className="order__time-stamp">{dayjs(order.orderPlacementDate).format("MMM DD, hh:mm A")}</i></span>}</p>
            </HStack>
            <Divider/>
            <HStack spacing="20px" p="1em">
                <Box style={{backgroundColor: "#D7F7E9"}} className="order__box__icon">
                    <RocketIcon boxSize={8} color="#39C785" />
                </Box>

                <p className="text__md">{order.isRunner ? `${order.user.username}'s` : "Your"} order started <i className="order__time-stamp">{dayjs(order.orderPlacementDate).format("MMM DD, hh:mm A")}</i></p>
            </HStack>
            <Divider />
            {order.chat === null ? (<Box>
                <HStack p="1em" spacing="20px" alignItems="start">
                    <Image src={order.isRunner ? order.payTo.avatar : order.user.avatar} alt="user" width="50px" height="50px" className="avatar"/>
                    <Box width="100%">
                        <Formik validationSchema={validationSchema} initialValues={{text: ""}} onSubmit={values => {
                         order.isRunner ? sendChatToRunner(order.job.id, order.payTo.id, values) : startChatWithUser(order.job.id, order.user.id, values);
                        }}>
                            {({
                                handleSubmit,
                                values,
                                handleChange,
                                handleBlur,
                                touched,
                                errors,
                                isSubmitting,
                                isValid,
                                dirty
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Textarea isInvalid={!!errors.text && touched.text} width="100%" name="text" value={values.text} onChange={handleChange} onBlur={handleBlur} className="form__textarea form__textarea__no__label" rows={3} placeholder="Send a message to your runner" />
                                    {errors.text && touched.text && (
                                        <small className="form__error">{errors.text}</small>
                                    )}
                                    <Box style={{display: "flex", justifyContent: "flex-end"}}>
                                        <Button type="submit" isLoading={isSubmitting} disabled={!isValid || isSubmitting || !dirty}  leftIcon={<SendIcon color="#fff" boxSize={6} />} className="btn btn__nm btn__primary">
                                             Send
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </HStack>
            </Box>) :   ( <HStack spacing="20px" p="1em">
                <Box style={{backgroundColor: "#DDF0F6"}} className="order__box__icon">
                    <ChatIcon boxSize={8} color="#6296D4" />
                </Box>

                <p className="text__md">You started a chat with {order.isRunner ? order.user.username : order.payTo.username} <i className="order__time-stamp">{dayjs(order.chat.createdAt).format("MMM DD, hh:mm A")}</i></p>
            </HStack>)}
            {dayjs(order.orderPlacementDate).isBefore(dayjs(order.orderStartedDate)) && (
                <Box>
                    <Divider />
                <HStack spacing="20px" p="1em">
                    <Box style={{backgroundColor: "#FFE9F7"}} className="order__box__icon">
                        <BoxIcon boxSize={8} color="#E774BA" />
                    </Box>

                    <p className="text__md">{order.isRunner ? <span>You marked this order as started</span> : <span>{order.payTo.username} marked this order as started</span>} <i className="order__time-stamp">{dayjs(order.orderStartedDate).format("MMM DD, hh:mm A")}</i></p>
                </HStack>
                    </Box>
            )}
        </Box>
            {order.chat !== null &&
                <p className="text__silent text__middle">View <Link to={`/conversation/${order.chat.id}`} className="text__blue link">conversation</Link> with {order.isRunner ? order.user.username : order.payTo.username} in your inbox</p>
            }
        </Box>
    )
}

export default observer(OrderActivity);