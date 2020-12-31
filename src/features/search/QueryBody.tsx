import React from "react";
import {observer} from "mobx-react-lite";
import {IPaginatedTaskResponse, ITaskQueryValues} from "../../infrastructure/models/task";
import TaskItem from "./TaskItem";
import {Box, HStack} from "@chakra-ui/react";
import {useMediaQuery} from "react-responsive";
import Pagination from "../../infrastructure/paging/Pagination";

interface IProps{
    tasks: IPaginatedTaskResponse;
    taskQueryValues: ITaskQueryValues
}

const QueryBody : React.FC<IProps> = ({tasks, taskQueryValues}) => {
    const isMobile = useMediaQuery({query: "(max-width: 600px)"})
    return (
        <div>
            <HStack>
                <Box w={isMobile ? "100%" : "80%"}>
            <div className="query__info">
                <p className="text__silent text__sm">{tasks.totalRecords} tasks found</p>
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
           </HStack>
        </div>
    )
}




export default observer(QueryBody);