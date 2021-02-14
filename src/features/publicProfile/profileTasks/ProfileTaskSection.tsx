import { Box, Grid, HStack } from "@chakra-ui/react";
import React from "react";
import {observer} from "mobx-react-lite";
import {ITask} from "../../../infrastructure/models/task";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";

interface IProps{
    profileTasks: ITask[];
}

const ProfileTaskSection : React.FC<IProps>  = ({profileTasks}) => {
    return (
        <Box>
            <HStack alignItems="center" justifyContent="space-between" mb={5}>
            <h5 className="text__darker text__bigger__md">Recent uploads</h5>
                {profileTasks.length === 6 && <Link to="/" className="text__blue">view all</Link>}
            </HStack>
            {profileTasks.length > 0 ? (
                <Grid templateColumns={{xl: "repeat(3, 1fr)", lg: "repeat(3, 1fr)", md: "repeat(2, 1fr)", sm:"1fr"}} gap={7}>
                    {profileTasks.map(task => (
                    <TaskCard task={task} key={task.id} />
                ))}
                </Grid>
            ) : "No task"}
        </Box>
    )
}

export default observer(ProfileTaskSection);