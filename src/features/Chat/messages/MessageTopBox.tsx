import { Box, HStack, Image } from "@chakra-ui/react";
import React from "react";
import {IChat} from "../../../infrastructure/models/chat";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

interface IProps{
    chat: IChat
}

const MessageTopBox : React.FC<IProps> = ({chat}) => {
    return (
        <Box className="message__top">
            <HStack spacing="20px">
                {chat.jobPhotos.length > 0 && <Image src={chat.jobPhotos[0].url} alt="job-image" boxSize="70px" />}
                <Box>
                    <Link to={`/task/${chat.jobId}`} className="text__blue truncate__1">{chat.jobTitle}</Link>
                    <p className="text__green text__bigger__md">${chat.jobBudget}</p>
                </Box>
            </HStack>
            
            <Box style={{float: "right"}}>
            </Box>
        </Box>
    )
}

export default observer(MessageTopBox);