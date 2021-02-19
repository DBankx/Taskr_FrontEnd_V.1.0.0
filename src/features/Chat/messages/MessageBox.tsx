import React from "react";
import {observer} from "mobx-react-lite";
import {Box, StackDivider, VStack} from "@chakra-ui/react";
import {IChat} from "../../../infrastructure/models/chat";
import MessageTopBox from "./MessageTopBox";
import MessageBodyContainer from "./body/MessageBodyContainer";
import MessageInput from "./MessageInput";

interface IProps{
    chat: IChat
}

const MessageBox : React.FC<IProps> = ({chat}) => {
    return (
        <Box>
            <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={0}
                align="stretch"
                className="task__bid__form__card no__padding message__container"
            >
                <MessageTopBox chat={chat} />
                <MessageBodyContainer chat={chat} />
                <MessageInput />
            </VStack>
        </Box>
    )
}

export default observer(MessageBox);