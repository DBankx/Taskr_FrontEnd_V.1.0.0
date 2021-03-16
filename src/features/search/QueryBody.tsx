import React, {lazy, Suspense, useContext} from "react";
import {observer} from "mobx-react-lite";
import {IPaginatedTaskResponse, ITaskQueryValues} from "../../infrastructure/models/task";
import TaskItem from "./TaskItem";
import {Box, SimpleGrid, useMediaQuery} from "@chakra-ui/react";
import Pagination from "../../infrastructure/paging/Pagination";
import InlineLoader from "../../application/appLayout/InlineLoader";
import rootStoreContext from "../../application/stores/rootstore";

const SignUpReminder = lazy(() => import("../../infrastructure/reminders/SignUpReminder"));

interface IProps{
    tasks: IPaginatedTaskResponse;
    taskQueryValues: ITaskQueryValues
}

const QueryBody : React.FC<IProps> = ({tasks, taskQueryValues}) => {
    const [isSmallScreen] = useMediaQuery("(max-width: 1000px)");
    const {isLoggedIn} = useContext(rootStoreContext).authStore;
    return (
        <div>
            <SimpleGrid columns={{sm: 1, md: 1, lg: 2, xl: 2}} spacing="15px" templateColumns={{lg: "2fr 0.5fr", sm: "1fr", md: "1fr", xl: "2fr 0.4fr"}}>
                <Box>
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
                 <Suspense fallback={<InlineLoader />}>
                     {!isSmallScreen && !isLoggedIn &&<Box>
                    <SignUpReminder />
                </Box> }
                </Suspense>
           </SimpleGrid>
        </div>
    )
}




export default observer(QueryBody);