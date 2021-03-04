import {Badge, Box, HStack, Image, Spacer, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import React from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

interface IProps{
    task: ITask
}

const TaskAssignedDetails = ({task}: IProps) => {
    return (
        <Box className="task__bid__form__card">
            <HStack spacing="20px">
            <p className="text__silent text__upper">Accepted Bid</p>
            <Badge colorScheme="orange">Pending completion</Badge>
            </HStack>
            <HStack spacing="10px" mt={5}>
                <Image src={task.assignedUser.avatar} alt="avatar" className="avatar avatar__nm" />
                <Box style={{lineHeight: "1.2em"}}>
                <Link to={`/public-profile/${task.assignedUser.id}`}  className="link text__blue">{task.assignedUser.userName}</Link>
                    <p className="text__silent text__sm">Joined {dayjs(task.assignedUser.createdAt).format("MMM YY")}</p>
                </Box>
            </HStack>
            <HStack mt={5}>
                <p className="text__darker">Bid amount</p>
                <Spacer />
                <Stat>
                    <StatLabel style={{fontSize: "0.875em"}}>Collected Fees</StatLabel>
                    <StatNumber style={{fontSize: "1.5em", color: "#37a864"}}>${task.acceptedBid.price}</StatNumber>
                    <StatHelpText style={{fontSize: "0.875em", textDecoration: ""}}>Pending payout</StatHelpText>
                </Stat>
            </HStack>
            <Box mt={5} p="0.75em" className="bid__description">
                {task.acceptedBid.description}
           </Box>
            <Box mb={5}>
            <p className="text__light__grey text__sm">Assigned 1 day ago</p>
            </Box>
            {task.isOwner && <Box className="middle__item">
                <Link to={`/orders/12345`} style={{display: "block"}} className="link text__blue">View order &#8594;</Link>
            </Box>}
        </Box>
    )
}

export default observer(TaskAssignedDetails);