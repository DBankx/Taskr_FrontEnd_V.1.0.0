import React from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import {Box, Divider, Flex, HStack, Image, SimpleGrid, Spacer} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {BidIcon, BinocularsIcon, DeliveryIcon, LocationIcon} from "../../infrastructure/icons/Icons";

interface IProps{
    task: ITask
}

const TaskItem : React.FC<IProps> = ({task}) => {
    return (
        <div className="query__task__card">
            <SimpleGrid columns={{sm: 1, md: 2, lg: 2}} spacing="15px" templateColumns={{sm: "1fr", lg:"0.5fr 2fr", md: "0.5fr 2fr"}}>
                <Box>
                    a
                </Box>
                <Box>
            <div className="query__task__title">
               <Link to={`/task/${task.id}`}><span className="truncate">{task.title}</span></Link>
            </div>
                <HStack spacing="10px">
                    <Image borderRadius="full" boxSize="30px" alt="tasker-avatar" src={`https://ui-avatars.com/api/?name=${task.creatorUsername}&rounded=true&bold=true`} />
                    <span>{task.creatorUsername}</span>
                    <div>
                        <span className="text__sm text__silent">•</span>
                        <span className="text__sm text__silent" style={{marginLeft: "0.5em"}}>2 days ago</span>
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
                    Lagos / Ajah
                </div>
                <Spacer />
                <div className="text__dark__grey query__price__label">
                    <small>Starting at</small>
                    <span>${task.initialPrice}</span>
                </div>
            </Flex>
        </div>
    )
} 

export default observer(TaskItem);