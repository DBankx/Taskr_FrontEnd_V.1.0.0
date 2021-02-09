import React from "react";
import {ITask} from "../../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import {Box, Stack, Image, Link as Linker, SimpleGrid, Divider, Alert, AlertIcon} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BidPageForm from "./BidPageForm";
import {DeliveryTypes} from "../../../infrastructure/enums/deliveryTypes";

interface IProps{
    task: ITask
}

const TaskBidItem : React.FC<IProps> = ({task}) => {
    return (
        <div className="task__bid__form__card">
            <div>
                <h3 className="text__darker">Task details</h3>
            </div>
                <div style={{margin: "1em 0"}}>
                    {task.isBidActive && <Alert status="info" variant="left-accent">
                        <AlertIcon/>
                        You have an active bid on this task 
                    </Alert>}
                </div>
            <Stack direction={["column", "row"]} spacing="20px">
                {task.photos.length > 0 && <Box>
                   <Image src={task.photos[0].url} alt="task-photo" boxSize="100px" />
               </Box> }
                <Box>
                    <Linker className="text__blue" as={Link} to={`/task/${task.id}`}>{task.title}</Linker>
                </Box>
            </Stack>
            <div style={{margin: "1em 0"}}>
                <SimpleGrid templateColumns="0.5fr 1fr">
                    <p className="text__silent">Taskr&apos;s Budget:</p>
                    <p className="text__darker">${task.initialPrice}</p>
                </SimpleGrid>
                <SimpleGrid templateColumns="0.5fr 1fr">
                    <p className="text__silent">Location:</p>
                    <p className="text__darker">{task.address && `${task.address} / `}{task.postCode}</p>
                </SimpleGrid>
                <SimpleGrid templateColumns="0.5fr 1fr">
                    <p className="text__silent">Delivery:</p>
                    <p className="text__darker">{task.deliveryType === DeliveryTypes.InPerson ? "In Person" : "Online"}</p>
                </SimpleGrid>
            </div>
            <Divider />
            {!task.isOwner && <div style={{margin: "1em 0"}}>
                <BidPageForm task={task} />
            </div>}
        </div>
    )
}

export default observer(TaskBidItem);