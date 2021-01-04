import React from "react";
import { ITask } from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import { Box, HStack } from "@chakra-ui/react";
import {BinocularsIcon, FlagIcon, ShareButtonIcon} from "../../infrastructure/icons/Icons";

interface IProps{
    task: ITask
}

const TaskTop : React.FC<IProps> = ({task}) => {
    return (
        <div className="task__top">
            <h1 className="task__title">{task.title}</h1>
            <HStack className="task__top__actions" alignItems="center" spacing="10px">
                <Box className="task__action__button">
                    <BinocularsIcon boxSize={8} color="#3D3373" />
                </Box>
                <Box className="task__action__button">
                    <FlagIcon boxSize={8} color="#F1454F" />
                </Box>
                <Box className="task__action__button">
                    <ShareButtonIcon boxSize={8} color="#2DA3EB" />
                </Box>
            </HStack>
        </div>
    )
}

export default observer(TaskTop);