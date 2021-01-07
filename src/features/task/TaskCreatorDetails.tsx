import React from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import { HStack, Image } from "@chakra-ui/react";
import {NoteIcon, OwnerIcon} from "../../infrastructure/icons/Icons";

interface IProps{
    task: ITask
}

const TaskCreatorDetails : React.FC<IProps> = ({task}) => {
    return (
        <div className="task__bid__form__card">
            <div style={{marginBottom: "1em"}}>
                <h3 className="text__primary" style={{fontSize: "19px"}}>Tasker Info</h3>
            </div>
            <HStack spacing="15px">
                <Image borderRadius="full" boxSize="40px" alt="tasker-avatar" src={task.creator.avatar} />
                <div>
                    <p style={{fontSize: "19px", lineHeight: "20px", textAlign: "left"}} className="text__darker">{task.creator.userName}</p>
                </div>
            </HStack>
            
            <HStack mt={5} mb={5} spacing="10px">
                <OwnerIcon boxSize={8} color="#3D3373" />
                <p style={{color: "#6f727f", fontSize: "17px", lineHeight: "20px"}}>Creator</p>
            </HStack>
            
            <HStack mt={5} mb={5} spacing="10px">
                <NoteIcon boxSize={8} color="#3D3373" />
                <p style={{color: "#6f727f", fontSize: "17px", lineHeight: "20px"}}>8 Task listings</p>
            </HStack>
            
            
        </div>
    )
}

export default observer(TaskCreatorDetails);