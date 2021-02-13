import React from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import {Box, Divider, Flex, HStack, Image, SimpleGrid, Spacer, useMediaQuery} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {CalendarIcon, LocationIcon} from "../../infrastructure/icons/Icons";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

interface IProps{
    task: ITask
}

dayjs.extend(relativeTime);

// TODO - change creator avatar to use the avatar from the Database

const TaskItem : React.FC<IProps> = ({task}) => {
    const hasPhotos = task.photos.length > 0;
    const [isMobile] = useMediaQuery("(max-width: 400px)");
    return (
        <div className="query__task__card">
            <SimpleGrid columns={{sm: 1, md: 2, lg: 2}} spacing="15px" templateColumns={{sm: "1fr", lg:!hasPhotos ? "1fr" : "0.5fr 2fr", md: !hasPhotos ? "1fr" : "0.5fr 2fr"}}>
                {hasPhotos && <Box>
                    <Image objectFit="cover" style={{height: "150px", width: "100%"}} src={task.photos[0].url} alt="task-img" />
                </Box> }
                <Box>
            <div className="query__task__title">
               <Link to={`/task/${task.id}`}><span className="truncate">{task.title}</span></Link>
            </div>
                <HStack spacing="10px" style={{margin: "0.5em 0"}}>
                    <Image borderRadius="full" boxSize="30px" alt="tasker-avatar" src={`https://ui-avatars.com/api/?name=${task.creator.userName}&rounded=true&bold=true`} />
                    <Link className="text__blue" to={`/public-profile/${task.creator.id}`}>{task.creator.userName}</Link>
                    <div>
                        <span className="text__sm text__silent">•</span>
                        <span className="text__sm text__silent" style={{marginLeft: "0.5em"}}>{dayjs(task.createdAt).fromNow()}</span>
                    </div>
                </HStack>
                        <div className="query__task__description">
                            <span className="truncate__3">
                                {task.description}
                            </span>
                        </div>
                    <div className="query__task__endDate">
                        <small className="text__primary"><CalendarIcon color="#3D3373" /> Ends {dayjs(task.deliveryDate).from(Date.now())} </small>
                    </div>
                </Box>
            </SimpleGrid>
            <Divider mt={3} mb={3} />
            <Flex alignItems="center">
                <div className="text__darker">
                    <LocationIcon boxSize={8} />
                    {task.postCode ? task.postCode : "Online"}
                </div>
                <Spacer />
                <div className="text__dark__grey query__price__label">
                    {!isMobile && <small>Starting at</small> }
                    <span>${task.initialPrice}</span>
                </div>
            </Flex>
            <div className="task__status__label">
                OPEN
            </div>
        </div>
    )
} 

export default observer(TaskItem);