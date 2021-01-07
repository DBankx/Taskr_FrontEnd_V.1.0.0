import React from "react";
import { ITask } from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import {Box, HStack, Image} from "@chakra-ui/react";
import {BinocularsIcon, FlagIcon, ShareButtonIcon, StarIcon} from "../../infrastructure/icons/Icons";

interface IProps{
    task: ITask
}

const TaskTop : React.FC<IProps> = ({task}) => {
    return (
        <div >
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
            <div>
                <HStack spacing="9px">
                    <Image borderRadius="full" boxSize="30px" alt="tasker-avatar" src={task.creator.avatar} />
                    <div>
                        <p style={{fontSize: "15px", lineHeight: "20px", textAlign: "left"}} className="text__darker">{task.creator.userName}</p>
                    </div>
                    
                    <p style={{color: "#C9D7EC"}}>&#124;</p>
                    
                    <p style={{fontSize: "15px", color: "#FFC850"}}><StarIcon boxSize={5} /> <StarIcon boxSize={5} /> <StarIcon boxSize={5} /> <StarIcon boxSize={5} /> 4.0 <span style={{color: "#62677D"}}>(12) reviews</span></p>
                </HStack>
            </div>
        </div>
    )
}

export default observer(TaskTop);