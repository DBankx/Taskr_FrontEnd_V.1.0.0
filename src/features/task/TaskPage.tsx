import {Box, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import { RouteComponentProps } from "react-router-dom";
import FullPageSpinner from "../../application/appLayout/FullPageSpinner";
import SEO from "../../application/appLayout/SEO";
import rootStoreContext from "../../application/stores/rootstore";
import TaskImages from "./TaskImages";
import TaskTop from "./TaskTop";
import TaskDetails from "./TaskDetails";

const TaskPage : React.FC<RouteComponentProps<{id: string}>> = ({match}) => {
    const {getTaskById, loadingInitial, task} = useContext(rootStoreContext).jobStore;
    
    useEffect(() => {
        getTaskById(match.params.id)
    }, [getTaskById, match.params.id])
    
    if(loadingInitial || !task) return <FullPageSpinner />
    
    return (
        <div className="container">
            <SEO title={task.title} />
            <div className="main">
                <TaskTop task={task} />
                <div style={{marginTop: "1em"}}>
                <SimpleGrid className="task__body__grid" templateColumns={{xl: "1fr 1fr 1fr", lg: "1fr 1fr", md: "1fr", sm: "1fr"}} spacing="10px">
                    <Box style={{boxSizing: "border-box", width: "100%"}} className="task__body__grid__1">
                        <TaskImages task={task} />
                    </Box>
                    <Box>
                    <TaskDetails task={task} />
                    </Box>
                    <Box>
                       bottom 
                    </Box>
                </SimpleGrid>
                </div>
            </div>
        </div>
    )
}

export default observer(TaskPage);