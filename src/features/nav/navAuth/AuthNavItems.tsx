import React, {useContext, useEffect, useState} from "react";
import {IUser} from "../../../infrastructure/models/auth";
import {observer} from "mobx-react-lite";
import {Box, HStack, Popover, PopoverArrow,
    PopoverBody,
    PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Button } from "@chakra-ui/react";
import ProfileMenu from "./ProfileMenu";
import {
    BinocularsIcon,
    ChatIcon,
    CheckmarkIcon,
    NotificationIcon,
    TrashIcon
} from "../../../infrastructure/icons/Icons";
import {history} from "../../../index";
import rootStoreContext from "../../../application/stores/rootstore";
import NotificationsPage from "../../notifications/NotificationsPage";
import {Link} from "react-router-dom";

interface IProps{
    user: IUser
}



const AuthNavItems : React.FC<IProps> = ({user}) => {
    const {stopHubConnection, createNotificationHubConnection} = useContext(rootStoreContext).appStore;
    const {markAllNotificationsAsRead, deleteAllNotifications, userNotifications} = useContext(rootStoreContext).profileStore;
    const [isReadingNotifications, setIsReadingNotifications] = useState(false);
    const [isDeletingNotifications, setIsDeletingNotifications] = useState(false);
    useEffect(() => {
        createNotificationHubConnection();
        return () => stopHubConnection();
    }, [createNotificationHubConnection, stopHubConnection])
    return (
        <HStack spacing="30px" alignItems="center">
            <Link to="/profile?tab=3" title="watchlist" className="auth__nav__item">
                <BinocularsIcon boxSize={10} color="#3D3373" />
            </Link>
            <Box title="My Notifications" className="auth__nav__item">
                    <Popover isLazy={true} variant="responsive" placement="bottom">
                        <PopoverTrigger>
                            <Box style={{position: "relative"}}>
                                <NotificationIcon boxSize={10} color="#3D3373" />
                                {user.hasUnReadNotifications && <div className="notif__label" />}
                            </Box>
                        </PopoverTrigger>
                        <Portal>
                        <PopoverContent boxShadow="xs">
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader className="text__darker">Notifications</PopoverHeader>
                            <PopoverBody p={0} style={{position: "relative"}}>
                                <NotificationsPage />
                            </PopoverBody>
                            <PopoverFooter>
                                <HStack justifyContent="space-between">
                                    <Button disabled={userNotifications === null || userNotifications.data.length <= 0} isLoading={isReadingNotifications} variant="ghost" leftIcon={<CheckmarkIcon />} className="btn text__silent btn__ghost btn__hover__grey" onClick={() =>{
                                        setIsReadingNotifications(true)
                                        markAllNotificationsAsRead().finally(() => setIsReadingNotifications(false))
                                    }}> Mark all as read</Button>
                                    <Button disabled={userNotifications === null ||  userNotifications.data.length <= 0} isLoading={isDeletingNotifications} variant="ghost" leftIcon={<TrashIcon />} className="text__silent btn btn__ghost btn__hover__grey" onClick={() => {
                                        setIsDeletingNotifications(true);
                                        deleteAllNotifications().finally(() => setIsDeletingNotifications(false));
                                    }}>Delete All</Button>
                                </HStack>
                            </PopoverFooter>
                        </PopoverContent>
                        </Portal>
                    </Popover>
            </Box>
            <Box title="My Messages" className="auth__nav__item">
                <ChatIcon boxSize={10} color="#3D3373" />
            </Box>
            <Box title="My profile" className="auth__nav__item">
                <ProfileMenu user={user} />
            </Box>
            <Box>
                <button onClick={() => history.push("/create-task/details")} className="btn btn__primary btn__shadow btn__bold">Post a task</button>
            </Box>
        </HStack>
    )
}

export default observer(AuthNavItems);