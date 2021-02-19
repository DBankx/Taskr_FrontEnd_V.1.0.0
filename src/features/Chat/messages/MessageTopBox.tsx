import { Box, HStack, Image } from "@chakra-ui/react";
import React from "react";
import {IChat} from "../../../infrastructure/models/chat";
import {observer} from "mobx-react-lite";

interface IProps{
    chat: IChat
}

const MessageTopBox : React.FC<IProps> = ({chat}) => {
    return (
        <Box className="message__top">
            <HStack spacing="10px">
                {chat.jobPhotos.length > 0 && <Image src={chat.jobPhotos[0].url} alt="job-image" boxSize="70px" />}
                <Box>
                    <p className="text__blue text__bigger__md truncate__1">{chat.jobTitle}</p>
                    <p className="text__green text__bigger__md">${chat.jobBudget}</p>
                </Box>
            </HStack>
        </Box>
    )
}

export default observer(MessageTopBox);