import React, {useContext} from "react";
import {IChat} from "../../infrastructure/models/chat";
import {observer} from "mobx-react-lite";
import {Box, HStack, useMediaQuery, Checkbox, Image, Button} from "@chakra-ui/react";
import { TrashIcon } from "../../infrastructure/icons/Icons";
import {Link} from "react-router-dom";
import {history} from "../../index";
import rootStoreContext from "../../application/stores/rootstore";

interface IProps{
    chat: IChat,
    predicate: string
}

const ChatBox : React.FC<IProps> = ({chat, predicate}) => {
    const {deletingChat, deleteChat, chatTarget} = useContext(rootStoreContext).chatStore;
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    return (
        <Box onClick={() => history.push(`/conversation/${chat.id}`)} className="chat__box">
            <HStack spacing="20px">
                {!isMobile && <Checkbox />}
                <Box width="100%">
                    <HStack spacing="10px" width="100%">
                        <Box style={{position: "relative"}}>
                        <Image className="avatar avatar__chat" src={predicate === "taskr" ? chat.runner.avatar : chat.taskr.avatar} alt={predicate === "taskr" ? "taskr-avatar" : "runner-avatar"} />
                            {chat.jobPhotos.length > 0 && <Image src={chat.jobPhotos[0].url} alt="job-photo" className="chat__job__photo" />}
                        </Box>
                        <Box width="100%">
                            <HStack justifyContent="space-between" alignItems="center">
                            <Link to={`/task/${chat.jobId}`} style={{fontSize: "1.12em"}} className="text__blue truncate__1">{chat.jobTitle}</Link>
                                <p className="text__dark__grey">2d</p>
                            </HStack>
                            <p className="text__silent truncate__1">{chat.newestMessage}</p>
                            <HStack alignItems="center" justifyContent="space-between">
                            <p className="text__darker">{predicate === "taskr" ? chat.runner.userName : chat.taskr.userName}</p>
                                <Button isLoading={chatTarget === chat.id && deletingChat} onClick={() => deleteChat(chat.id, predicate)} variant="ghost" className="btn btn__ghost" style={{color: "#2DA3EB"}} leftIcon={<TrashIcon boxSize={isMobile ? 8 : 5} />}>{!isMobile && "Delete"}</Button>
                            </HStack>
                        </Box>
                    </HStack>
                </Box>
            </HStack>
        </Box>
    )
}

export default observer(ChatBox);