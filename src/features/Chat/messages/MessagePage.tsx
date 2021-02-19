import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Box, Link, SimpleGrid, useMediaQuery} from "@chakra-ui/react";
import rootStoreContext from "../../../application/stores/rootstore";
import {RouteComponentProps} from "react-router-dom";
import MessageBox from "./MessageBox";

const MessagePage : React.FC<RouteComponentProps<{chatId: string}>> = ({match}) => {
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    const {chat, loadingChat, getChatById, createHubConnection, stopHubConnection} = useContext(rootStoreContext).chatStore;
    useEffect(() => {
            getChatById(match.params.chatId).then((response) => createHubConnection(response!.id));
            return () => stopHubConnection();
    }, [match.params.chatId, getChatById, createHubConnection, stopHubConnection])
    
    return (
        <Box className="container">
            <Box className="main">
                {!isMobile && <Link className="text__blue" to="/inbox">&#60; Back to my inbox</Link>}
                {loadingChat || chat == null ? "no here" : 
                    <SimpleGrid templateColumns={{xl: "2fr 0.5fr", lg: "2fr 0.5fr"}} >
                    <MessageBox chat={chat} />
                </SimpleGrid>}
            </Box>
        </Box>
    )
}

export default observer(MessagePage);