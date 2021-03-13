import React from "react";
import {observer} from "mobx-react-lite";
import {Badge} from "@chakra-ui/react";
import {TaskStatus as Status} from "../../infrastructure/enums/taskStatus";

interface IProps{
    taskStatus: Status;
}

const TaskStatus = ({taskStatus}: IProps) => {
    return (
       taskStatus === Status.Active ? <Badge colorScheme="green">Open</Badge> : taskStatus === Status.Assigned ? <Badge colorScheme="facebook">Assigned</Badge> : taskStatus === Status.Completed ? <Badge colorScheme="green">Completed</Badge> : <Badge colorScheme="red">Ended</Badge>
    )
}

export default observer(TaskStatus);