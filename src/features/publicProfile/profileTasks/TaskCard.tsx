import { Box, Divider, HStack, Image } from "@chakra-ui/react";
import React from "react";
import {ITask} from "../../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import TaskCardSlider from "./TaskCardSlider";
import {Link} from "react-router-dom";
import {DeliveryTypes} from "../../../infrastructure/enums/deliveryTypes";
import {BinocularsFilledIcon, CalendarIcon, LocationIcon, WebIcon} from "../../../infrastructure/icons/Icons";
import dayjs from "dayjs";

interface IProps{
    task: ITask;
}

const TaskCard : React.FC<IProps> = ({task}) => {
    return (
        <Box className="task__bid__form__card" style={{marginBottom: "0", padding: "0", borderRadius: "0", position: "relative"}}>
            <Box>
                {task.photos.length > 0 && <TaskCardSlider photos={task.photos} />}
            </Box>
            <Box style={{padding: "10px 15px"}}>
                <HStack spacing="10px">
                    <Image src={task.creator.avatar} style={{borderRadius:"50%"}} boxSize="30px" alt="task-user" />
                        <Link to={`/public-profile/${task.creator.id}`} className="text__darker">{task.creator.userName}</Link>
                </HStack>
                <Box mt={4}>
                <Link to={`/task/${task.id}`} className="truncate__2 text__darker text__hover__primary">{task.title}</Link>
                </Box>
                <Box mt={4}>
                    <p className="text__silent text__sm">{task.deliveryType === DeliveryTypes.InPerson ? <LocationIcon boxSize={5} /> : <WebIcon boxSize={5} /> } {DeliveryTypes[task.deliveryType]}</p>
                    <p className="text__silent text__sm"><CalendarIcon boxSize={5} /> {dayjs(task.deliveryDate).format("ddd, DD MMM")}</p>
                </Box>
            </Box>
            <Divider mt={2} mb={1} />
            <Box style={{padding: "5px 15px"}}>
                <HStack justifyContent="space-between">
                    <p className="task__status__label__steady text__white">OPEN</p>
                    <Box className="text__dark__grey query__price__label">
                        <span>${task.initialPrice}</span>
                    </Box>
                </HStack>
            </Box>
            {task.isWatching && (
                <Box title="watching" style={{position: "absolute", top: "5px", right: "10px"}}><BinocularsFilledIcon color="#fff" boxSize={8} /></Box>
            )}
        </Box>
    )
}

export default observer(TaskCard);