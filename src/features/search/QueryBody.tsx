import React from "react";
import {observer} from "mobx-react-lite";
import {IPaginatedTaskResponse, ITaskQueryValues} from "../../infrastructure/models/task";
import TaskItem from "./TaskItem";
import {Box, SimpleGrid, HStack} from "@chakra-ui/react";
import Pagination from "../../infrastructure/paging/Pagination";

interface IProps{
    tasks: IPaginatedTaskResponse;
    taskQueryValues: ITaskQueryValues
}

const QueryBody : React.FC<IProps> = ({tasks, taskQueryValues}) => {
    return (
        <div>
            <SimpleGrid columns={{sm: 1, md: 1, lg: 2, xl: 2}} spacing="15px" templateColumns={{lg: "2fr 0.5fr", sm: "1fr", md: "1fr", xl: "2fr 0.4fr"}}>
                <Box>
            <div className="query__info">
                <HStack justifyContent="space-between">
                <p className="text__silent text__sm">{tasks.totalRecords} tasks found</p>
                    <p className="text__silent text__sm">Page {tasks.pageNumber} of {tasks.totalPages}</p>
                </HStack>
            </div>
            <div className="query__wrap__body">
                {tasks.data.map((task) => (
                    <div key={task.id}>
                        <TaskItem task={task} />
                    </div>
                ))}
            </div>
                    <Pagination pageNumber={taskQueryValues.pageNumber} pageSize={taskQueryValues.pageSize} totalPages={tasks.totalPages} totalRecords={tasks.totalRecords} />
                </Box>
           </SimpleGrid>
        </div>
    )
}




export default observer(QueryBody);