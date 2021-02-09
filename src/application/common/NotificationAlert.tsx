import {Box, HStack, Image, SimpleGrid} from "@chakra-ui/react";
import React from "react";
import {Link} from "react-router-dom";
import {INotification} from "../../infrastructure/models/notification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {NotificationType} from "../../infrastructure/enums/notification";
import {AssignAlertIcon, BidAlertIcon, ChatIcon, HeartAlertIcon} from "../../infrastructure/icons/Icons";

dayjs.extend(relativeTime);

interface IProps{
   data: INotification 
}

const NotificationAlert : React.FC<IProps> = ({data}) => {
    return (
        <Box>
            <SimpleGrid alignItems="flex-start" templateColumns="0.5fr 1.4fr">
                <Box className="alert__notif">
                    <Image src={data.fromUserAvatar} alt="user-avatar" className="alert__avatar"  />
                    <Box className="alert__helper" borderRadius="full" bg={data.type === NotificationType.Bid ? "#37a864" : data.type === NotificationType.Follow ? "#fff" : data.type === NotificationType.Message ? "#2DA3EB" : "#2DA3EB"} boxSize="25px">
                        {data.type === NotificationType.Bid ?  <BidAlertIcon boxSize="15px" color="#fff" /> : data.type === NotificationType.Follow ? <HeartAlertIcon boxSize="15px" /> : data.type === NotificationType.Message ? <ChatIcon boxSize="15px" color="#fff" /> : data.type === NotificationType.Assign ? <AssignAlertIcon boxSize="15px" color="#fff" /> : ""}
                    </Box>
                </Box>
                <Box >
                    <p style={{lineHeight: "1.2em"}} className="text__darker">{data.message}</p>
                    <HStack spacing="10px">
                    <p className="text__sm text__light">{dayjs(data.createdAt).fromNow()}</p>
                        <p className="text__sm">•</p>
                        <Link to={data.type === NotificationType.Bid ? `/view-bids/${data.notifierObjectId}` : "/"} className="text__sm text__blue">View</Link>
                    </HStack>
                </Box>
            </SimpleGrid>
        </Box>
    )
}

export default NotificationAlert;