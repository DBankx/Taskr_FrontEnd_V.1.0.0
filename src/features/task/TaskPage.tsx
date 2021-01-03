import {Box, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import { RouteComponentProps } from "react-router-dom";
import FullPageSpinner from "../../application/appLayout/FullPageSpinner";
import rootStoreContext from "../../application/stores/rootstore";
import TaskImages from "./TaskImages";
import TaskTop from "./TaskTop";

const TaskPage : React.FC<RouteComponentProps<{id: string}>> = ({match}) => {
    const {getTaskById, loadingInitial, task} = useContext(rootStoreContext).jobStore;
    
    useEffect(() => {
        getTaskById(match.params.id)
    }, [getTaskById, match.params.id])
    
    if(loadingInitial || !task) return <FullPageSpinner />
    
    return (
        <div className="container">
            <div className="main">
                <TaskTop task={task} />
                <div style={{marginTop: "1em"}}>
                <SimpleGrid className="task__body__grid" templateColumns={{xl: "1fr 1fr 1fr", lg: "1fr 1fr 1fr", md: "1fr", sm: "1fr"}} spacing="2px">
                    <Box style={{boxSizing: "border-box", width: "100%"}} className="task__body__grid__1">
                        <TaskImages task={task} />
                    </Box>
                    <Box>
                    apple 
                    </Box>
                    <Box>
                       bottom 
                    </Box>
                    <Box>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Box>
                </SimpleGrid>
                </div>
            </div>
        </div>
    )
}

export default observer(TaskPage);