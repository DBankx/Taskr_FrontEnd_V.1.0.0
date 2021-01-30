import React, {useContext, useEffect} from "react";
import {NotificationIcon} from "../../../infrastructure/icons/Icons";
import {Box} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootstore";
import {IUser} from "../../../infrastructure/models/auth";

interface IProps{
    user: IUser;
}

const NotificationBox : React.FC<IProps> = ({user}) => {
    const {stopHubConnection, createNotificationHubConnection} = useContext(rootStoreContext).appStore;
    useEffect(() => {
        createNotificationHubConnection();
        return () => stopHubConnection();
    }, [createNotificationHubConnection, stopHubConnection])
    return (
        <Box style={{position: "relative"}}>
        <NotificationIcon boxSize={10} color="#3D3373" />
            {user.hasUnReadNotifications && <div className="notif__label" />}
        </Box>
    )
}

export default observer(NotificationBox);