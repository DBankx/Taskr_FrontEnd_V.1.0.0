import React from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import {Box, Divider, Flex, HStack, Image, SimpleGrid, Spacer} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {BidIcon, BinocularsIcon, DeliveryIcon, LocationIcon} from "../../infrastructure/icons/Icons";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import {useMediaQuery} from "react-responsive";

interface IProps{
    task: ITask
}

dayjs.extend(relativeTime);

const TaskItem : React.FC<IProps> = ({task}) => {
    const hasPhotos = task.photos.length > 0;
    const isMobile = useMediaQuery({query: "(max-width: 400px)"});
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
                <HStack spacing="10px">
                    <Image borderRadius="full" boxSize="30px" alt="tasker-avatar" src={`https://ui-avatars.com/api/?name=${task.creatorUsername}&rounded=true&bold=true`} />
                    <span>{task.creatorUsername}</span>
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
                    <div>
                        <small className="text__primary"><BinocularsIcon /> 13K watching </small>
                        <small style={{marginLeft: "2em"}} className="text__primary"><BidIcon /> 10 Bids </small>
                        <small style={{marginLeft: "2em"}} className="text__primary"><DeliveryIcon /> In 3 days time </small>
                    </div>
                </Box>
            </SimpleGrid>
            <Divider mt={3} mb={3} />
            <Flex alignItems="center">
                <div className="text__darker">
                    <LocationIcon boxSize={8} />
                    {task.city ? task.city : "NA"} / {task.postCode ? task.postCode : "NA"}
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