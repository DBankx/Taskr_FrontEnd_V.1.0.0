import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootstore";
import {NotificationIcon} from "../../infrastructure/icons/Icons";
import {Box, Button, Divider, HStack, Image, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import NotificationsPlaceholder from "./NotificationsPlaceholder";
import {INotification} from "../../infrastructure/models/notification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {NotificationStatus} from "../../infrastructure/enums/notification";

dayjs.extend(relativeTime);

const NotificationsPage = () => {
    const {getUserNotifications, loadingInitial, userNotifications, readNotification, deleteNotification} = useContext(rootStoreContext).profileStore;
    useEffect(() => {
        getUserNotifications();
    }, [getUserNotifications])
    if(loadingInitial || userNotifications === null) return <NotificationsPlaceholder /> 
    return (
        <div style={{width: "100%"}}> 
                {userNotifications.data.length > 0 ? (<div>
                    <Box> 
                        {userNotifications.data.map((notification: INotification) => (
                            <Box key={notification.id}>
                                <HStack className="notification__item" alignItems="start" spacing="10px">
                                    <Image src={notification.fromUserAvatar} alt="user-avatar" borderRadius="full" boxSize="60px" />
                                    <Box>
                                        <p className="text__darker" style={{lineHeight: "1.12em"}}>{notification.message}</p>
                                        <small className="text__blue">{dayjs(notification.createdAt).fromNow()}</small>
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
                                </HStack>
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