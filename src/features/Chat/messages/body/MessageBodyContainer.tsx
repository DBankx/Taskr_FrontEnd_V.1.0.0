import React, {useEffect, useRef} from "react";
import {IChat} from "../../../../infrastructure/models/chat";
import {observer} from "mobx-react-lite";
import { Box } from "@chakra-ui/react";
import TextMessage from "./TextMessage";

interface IProps{
    chat: IChat;
}

const MessageBodyContainer : React.FC<IProps> = ({chat}) => {
    const messagesEnd = useRef<HTMLDivElement | null>(null);
    const scrollToBottom = () => {
        messagesEnd.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom();
    }, [chat.messages])
    
    return (
        <Box className="message__body">
            {chat.messages.map((message) => (
                <Box key={message.id}>
                    <TextMessage message={message} />
                </Box>
            ))}
            <div style={{ float:"left", clear: "both" }} ref={messagesEnd}>
            </div>
        </Box>
    )
}

export default observer(MessageBodyContainer);