import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Box, useMediaQuery} from "@chakra-ui/react";
import rootStoreContext from "../../application/stores/rootstore";
import ChatsPlaceholder from "./ChatsPlaceholder";
import {ChatIcon} from "../../infrastructure/icons/Icons";

const RunnerChatTab = () => {
    const {loadingChats, getAllChats, chatsAsRunner} = useContext(rootStoreContext).chatStore;
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    useEffect(() => {
        getAllChats("AsRunner");
    }, [getAllChats])

    if(loadingChats || chatsAsRunner === null) return <ChatsPlaceholder /> 

    return (
        <Box>
            {chatsAsRunner.length > 0 ? "there" : (
                <Box style={{width: "100%"}} className="text__middle middle_position">
                    <ChatIcon boxSize={isMobile ? "40px" : "70px"} color="#373373" />
                    <Box>
                        <h1 className="text__primary text__heading">You have no chats as a Runner</h1>
                        <p style={{width: "80%", margin: "0 auto"}} className="text__silent">Message a taskr about their task or if you are assigned to compelete a task, your tasks are shown here! </p>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default observer(RunnerChatTab);