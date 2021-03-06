import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootstore";
import {
    AssignAlertIcon,
    BidAlertIcon, BoxIcon,
    ChatIcon,
    HeartAlertIcon,
    NotificationIcon
} from "../../infrastructure/icons/Icons";
import {Box, Button, Divider, Image, Menu, MenuButton, MenuItem, MenuList, SimpleGrid} from "@chakra-ui/react";
import NotificationsPlaceholder from "./NotificationsPlaceholder";
import {INotification} from "../../infrastructure/models/notification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {NotificationStatus, NotificationType} from "../../infrastructure/enums/notification";

dayjs.extend(relativeTime);

const NotificationsPage = () => {
    const {getUserNotifications, loadingNotifications, userNotifications, readNotification, deleteNotification} = useContext(rootStoreContext).profileStore;
    useEffect(() => {
        getUserNotifications();
    }, [getUserNotifications])
    if(loadingNotifications || userNotifications === null) return <NotificationsPlaceholder /> 
    return (
        <div style={{width: "100%"}}> 
                {userNotifications.data.length > 0 ? (<div>
                    <Box> 
                        {userNotifications.data.map((notification: INotification) => (
                            <Box key={notification.id}>
                                <SimpleGrid alignItems="flex-start" templateColumns="0.3fr 1.4fr" className="notification__item" spacing="10px">
                                    <Box className="alert__notif">
                                    <Image src={notification.fromUserAvatar} alt="user-avatar" borderRadius="full"  className="avatar avatar__notif" />
                                    <Box className="alert__helper alert__helper__right" borderRadius="full" bg={notification.type === NotificationType.Bid ? "#37a864" : notification.type === NotificationType.Follow ? "#fff" : notification.type === NotificationType.Message ? "#1FA9FA" : notification.type === NotificationType.Order ? "#6A0DAD" : "#2DA3EB"} boxSize="25px">
                                        {notification.type === NotificationType.Bid ?  <BidAlertIcon boxSize="15px" color="#fff" /> : notification.type === NotificationType.Follow ? <HeartAlertIcon boxSize="15px" /> : notification.type === NotificationType.Message ? <ChatIcon boxSize="15px" color="#fff" /> : notification.type === NotificationType.Assign ? <AssignAlertIcon boxSize="15px" color="#fff" /> : notification.type === NotificationType.Order ? <BoxIcon boxSize="15px" color="#fff" /> : ""}
                                    </Box>
                                    </Box>
                                    <Box style={{minHeight: "60px"}}>
                                        <p className="text__darker" style={{lineHeight: "1.12em"}}>{notification.message}</p>
                                        <small style={{verticalAlign: "bottom"}} className="text__blue">{dayjs(notification.createdAt).fromNow()}</small>
                                       <Menu isLazy={true}>
                                                <MenuButton as={Button} className="notification__options" boxShadow="md">
                                                    <p className="text__silent">•••</p>
                                                </MenuButton>
                                           <MenuList className="menu__list">
                                               {notification.status === NotificationStatus.UnRead &&
                                               <MenuItem onClick={() => {
                                                   readNotification(notification.id);
                                               }}>
                                                   Mark as read
                                               </MenuItem>
                                               }
                                               <MenuItem onClick={() => {
                                                   deleteNotification(notification.id);
                                               }}>
                                                   Delete Notification
                                               </MenuItem>
                                           </MenuList>
                                       </Menu>
                                        
                                        {notification.status === NotificationStatus.UnRead &&  <Box className="notifier" />}

                                    </Box>
                                </SimpleGrid>
                                <Divider />
                            </Box>
                        ))}
                    </Box>
                </div>) : (
                    <Box mt={4} p="1em" mb={4} className="text__middle">
                        <NotificationIcon  boxSize="40px" color="#373373" />
                        <Box>
                        <h1 className="text__primary">You have no new notifications!</h1>
                            <p style={{width: "80%", margin: "0 auto"}} className="text__silent">This is where you&apos;ll see updates on everything</p>
                        </Box>
                    </Box>
                )}
            </div>
    )
}

export default observer(NotificationsPage);