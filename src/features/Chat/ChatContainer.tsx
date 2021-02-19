import React from "react";
import {observer} from "mobx-react-lite";
import {Box, StackDivider, useMediaQuery, VStack} from "@chakra-ui/react";
import { IChat } from "../../infrastructure/models/chat";
import ChatBox from "./ChatBox";

interface IProps{
    predicate: string;
    chats: IChat[];
}

const ChatContainer : React.FC<IProps> = ({chats, predicate}) => {
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    return (
        <Box className={!isMobile ? "container" : ""}>
            <h3 className="text__bigger__md text__primary">Showing {chats.length} chats</h3>
            <Box className="task__bid__form__card small__no__padding no__padding">
              <VStack
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing={0}
                  align="stretch"
              >
                  {chats.map((chat : IChat) => (
                   <ChatBox chat={chat} predicate={predicate} key={chat.id} />   
                  ))}
              </VStack>  
            </Box>
        </Box>
    )
}

export default observer(ChatContainer);