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
        <SimpleGrid alignItems="center" templateColumns="2.5fr 0.5fr">
            <HStack alignItems="start">
                <Box>
                    <Image src={data.fromUserAvatar} alt="user-avatar" borderRadius="full" boxSize="60px"  />
                </Box>
                <Box >
                    <p className="text__primary">{data.type === NotificationType.Bid ? "Bid Placed" : data.type === NotificationType.Follow ? "New follower" : data.type === NotificationType.Message ? "New Message" : data.type === NotificationType.Assign ? "You've been assigned" : ""}</p>
                    <p style={{lineHeight: "1.2em"}} className="text__darker">{data.message}</p>
                    
                    <HStack spacing="10px">
                    <p className="text__sm text__light">{dayjs(data.createdAt).fromNow()}</p>
                        <p className="text__sm">•</p>
                        <Link to={data.type === NotificationType.Bid ? `/view-bids/${data.notifierObjectId}` : "/"} className="text__sm text__blue">View</Link>
                    </HStack>
                </Box>
            </HStack>
           
            {data.type === NotificationType.Bid ?  <BidAlertIcon boxSize="50px" color="#37a864" /> : data.type === NotificationType.Follow ? <HeartAlertIcon boxSize="50px" /> : data.type === NotificationType.Message ? <ChatIcon boxSize="50px" color="#3D3373" /> : data.type === NotificationType.Assign ? <AssignAlertIcon boxSize="50px" color="#2DA3EB" /> : ""}
        </SimpleGrid>
    )
}

export default NotificationAlert;