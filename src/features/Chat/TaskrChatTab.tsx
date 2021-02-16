import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Box, useMediaQuery} from "@chakra-ui/react";
import rootStoreContext from "../../application/stores/rootstore";
import ChatsPlaceholder from "./ChatsPlaceholder";
import {ChatIcon} from "../../infrastructure/icons/Icons";

const TaskrChatTab = () => {
    const {loadingChats, getAllChats, chatsAsTaskr} = useContext(rootStoreContext).chatStore;
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    useEffect(() => {
        getAllChats("AsTaskr");
    }, [getAllChats])

    if(loadingChats || chatsAsTaskr === null) return <ChatsPlaceholder /> 
    
    return (
        <Box>
            {chatsAsTaskr.length > 0 ? "there" : (
                <Box style={{width: "100%"}} className="text__middle middle_position">
                    <ChatIcon boxSize={isMobile ? "40px" : "70px"} color="#373373" />
                    <Box>
                        <h1 className="text__primary text__heading">You have no chats as a Taskr</h1>
                        <p style={{width: "80%", margin: "0 auto"}} className="text__silent">Assign a runner or if they contact you, your chats show up here!</p>
                    </Box>
                </Box>
            )} 
        </Box>
    )
}

export default observer(TaskrChatTab);