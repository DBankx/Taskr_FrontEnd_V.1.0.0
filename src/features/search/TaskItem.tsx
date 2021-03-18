import React from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import {Box, Divider, Flex, HStack, Image, SimpleGrid, Spacer, useMediaQuery, Center} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {CalendarIcon, LocationIcon, WebIcon} from "../../infrastructure/icons/Icons";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import TaskStatus from "../../application/common/TaskStatus";

interface IProps{
    task: ITask
}

dayjs.extend(relativeTime);


const TaskItem : React.FC<IProps> = ({task}) => {
    const hasPhotos = task.photos.length > 0;
    const [isMobile] = useMediaQuery("(max-width: 400px)");
    return (
        <div className="query__task__card">
            <SimpleGrid columns={{sm: 1, md: 2, lg: 2}} spacing="15px" templateColumns={{sm: !hasPhotos ? "1fr" : "0.5fr 2fr", lg:!hasPhotos ? "1fr" : "0.5fr 2fr", md: !hasPhotos ? "1fr" : "0.5fr 2fr"}}>
                {hasPhotos && <Box>
                    <Image objectFit="cover" style={{height: "150px", width: "100%"}} src={task.photos[0].url} alt="task-img" />
                </Box> }
                <Box>
            <div className="query__task__title">
               <Link to={`/task/${task.id}`}><span className="truncate__1">{task.title}</span></Link>
            </div>
                <HStack spacing="10px" style={{margin: "0.5em 0"}}>
                    <Image borderRadius="full" boxSize="30px" alt="tasker-avatar" src={task.creator.avatar} />
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
                    <HStack mt={4} spacing="20px">
                    <Box  className="query__task__endDate">
                        <Center>
                            <CalendarIcon mr="0.5em"  color="#7a7d85" boxSize={5} />
                            <small className="text__silent text__bold">Ends {dayjs(task.deliveryDate).from(Date.now())} </small>
                        </Center>
                    </Box>
                        <TaskStatus taskStatus={task.jobStatus} />
                    </HStack>
                </Box>
            </SimpleGrid>
            <Divider mt={3} mb={3} />
            <Flex alignItems="center">
                <div className="text__darker">
                    {task.postCode ? <LocationIcon boxSize={8} /> : <WebIcon boxSize={8} />}
                    {task.postCode ? "In person" : "Online"}
                </div>
                <Spacer />
                <div className="text__dark__grey query__price__label">
                    {!isMobile && <small>Starting at</small> }
                    <span>${task.initialPrice}</span>
                </div>
            </Flex>
            
        </div>
    )
} 

export default observer(TaskItem);