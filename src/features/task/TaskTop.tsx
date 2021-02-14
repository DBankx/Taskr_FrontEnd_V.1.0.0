import React, {useContext} from "react";
import { ITask } from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import {Box, HStack, Image, Spinner, useMediaQuery} from "@chakra-ui/react";
import {
    BinocularsFilledIcon,
    BinocularsIcon,
    EditIcon,
    FlagIcon,
    ShareButtonIcon,
    StarIcon, TrashIcon
} from "../../infrastructure/icons/Icons";
import {Link} from "react-router-dom";
import rootStoreContext from "../../application/stores/rootstore";

interface IProps{
    task: ITask
}

const TaskTop : React.FC<IProps> = ({task}) => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const {watchTask, watching, unWatchTask} = useContext(rootStoreContext).taskStore;
    return (
        <div >
        <div className="task__top">
            <h1 className="task__title">{task.title}</h1>
            <HStack className="task__top__actions" alignItems="center" spacing="10px">
                <Box className="task__action__button" onClick={() => task.isWatching ? unWatchTask(task.id) : watchTask(task.id)} title={task.isWatching ? "unwatch" : "watch"}>
                    {watching ? <Spinner color="#3D3373" boxSize={8} /> : task.isWatching ? <BinocularsFilledIcon boxSize={8} color="#3D3373" /> : <BinocularsIcon boxSize={8} color="#3D3373" />}
                </Box>
                <Box title="Report" className="task__action__button">
                    <FlagIcon boxSize={8} color="#F1454F" />
                </Box>
                <Box title="Share" className="task__action__button">
                    <ShareButtonIcon boxSize={8} color="#2DA3EB" />
                </Box>
                {task.isOwner && 
                <Box title="Edit" className="task__action__button">
                    <EditIcon boxSize={8} color="#3D3373" /> 
                </Box>}
                {task.isOwner && (
                    <Box title="Delete" className="task__action__button">
                        <TrashIcon boxSize={8} color="#E12120" />
                    </Box>
                )}
            </HStack>
        </div>
            <div style={isMobile ? {margin: "1em 0"} : {}}>
                <HStack spacing="9px">
                    <Image borderRadius="full" boxSize="30px" alt="tasker-avatar" src={task.creator.avatar} />
                    <div>
                        <Link className="text__blue" to={`/public-profile/${task.creator.id}`} style={{fontSize: "15px", lineHeight: "20px", textAlign: "left"}} >{task.creator.userName}</Link>
                    </div>
                    
                    <p style={{color: "#C9D7EC"}}>&#124;</p>
                    
                    <p style={{fontSize: "15px", color: "#FFC850"}}><StarIcon boxSize={5} /> <StarIcon boxSize={5} /> <StarIcon boxSize={5} /> <StarIcon boxSize={5} /> 4.0 <span style={{color: "#62677D"}}>(12) reviews</span></p>

                    <p style={{color: "#C9D7EC"}}>&#124;</p>

                    <div className="task__status__label__steady">
                        OPEN
                    </div>
                </HStack>
            </div>
        </div>
    )
}

export default observer(TaskTop);