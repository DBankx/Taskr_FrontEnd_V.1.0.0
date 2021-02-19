import React, {useContext} from "react";
import {IMessage} from "../../../../infrastructure/models/chat";
import {observer} from "mobx-react-lite";
import { Box, HStack, Image } from "@chakra-ui/react";
import rootStoreContext from "../../../../application/stores/rootstore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);


interface IProps{
    message: IMessage
}

const TextMessage : React.FC<IProps> = ({message}) => {
    const {user} = useContext(rootStoreContext).authStore;
    return (
        <HStack style={{marginTop: "1.5em"}} justifyContent={user!.id === message.sender.id ? "flex-end" : "flex-start"}>
            <Box>
                <HStack spacing="8px" alignItems="flex-end">
                    {user!.id !== message.sender.id && <Image src={message.sender.avatar} alt="sender-avatar" className="avatar avatar__message" />}
        <Box className={`message__text ${user!.id === message.sender.id ? "message__text__outgoing" : "message__text__incoming"}`}>
            {message.text}
        </Box>
                </HStack>
                <small className="text__nt text__bold" style={{textAlign: user!.id === message.sender.id ? "right" : "left", display: "block", marginLeft: user!.id !== message.sender.id ? "38px" : "auto" }}>{dayjs(message.sentAt).fromNow()}</small>
            </Box>
        </HStack>
    )
}

export default observer(TextMessage)