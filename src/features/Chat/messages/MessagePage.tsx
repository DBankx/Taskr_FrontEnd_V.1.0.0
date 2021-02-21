import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Box, SimpleGrid, useMediaQuery} from "@chakra-ui/react";
import rootStoreContext from "../../../application/stores/rootstore";
import {RouteComponentProps} from "react-router-dom";
import MessageBox from "./MessageBox";
import ReceiverProfile from "./ReceiverProfile";
import {Link} from "react-router-dom";
import MessagePagePlaceholder from "./MessagePagePlaceholder";
import SEO from "../../../application/appLayout/SEO";

const MessagePage : React.FC<RouteComponentProps<{chatId: string}>> = ({match}) => {
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    const {chat, loadingChat, getChatById, createHubConnection, stopHubConnection} = useContext(rootStoreContext).chatStore;
    const {user} = useContext(rootStoreContext).authStore;
    
    useEffect(() => {
            getChatById(match.params.chatId).then((response) => createHubConnection(response!.id));
            return () => stopHubConnection();
    }, [match.params.chatId, getChatById, createHubConnection, stopHubConnection])
    
    return (
        <Box className="container">
            <SEO title="My inbox" />
            <Box className="main">
                {!isMobile && <Link className="text__blue" to="/inbox">&#60; Back to my inbox</Link>}
                {loadingChat || chat == null ? <MessagePagePlaceholder /> : 
                    <Box style={{marginTop: isMobile ? "1em" : "3em"}}>
                    <SimpleGrid templateColumns={{xl: "2fr 0.8fr", lg: "2fr 1fr"}} spacing="20px" >
                    <MessageBox chat={chat} />
                        {!isMobile && <ReceiverProfile user={chat.taskr.id === user!.id ? chat.runner : chat.taskr} /> }
                </SimpleGrid>
                    </Box>
                        }
            </Box>
        </Box>
    )
}

export default observer(MessagePage);