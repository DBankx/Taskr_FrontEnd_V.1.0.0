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
import {useMediaQuery} from "react-responsive";
import TaskDescription from "./TaskDescription";
import BidForm from "../bid/BidForm";
// import TaskCreatorDetails from "./TaskCreatorDetails";

const TaskPage : React.FC<RouteComponentProps<{id: string}>> = ({match}) => {
    const {getTaskById, loadingInitial, task} = useContext(rootStoreContext).jobStore;
    const isMobile = useMediaQuery({query: "(max-width: 500px)"});
    useEffect(() => {
        getTaskById(match.params.id)
    }, [getTaskById, match.params.id])
    
    if(loadingInitial || !task) return <FullPageSpinner />
    
    return (
        <div>
        <div className="container">
            <SEO title={task.title} />
            <div className="main">
                <div style={isMobile ? {} : {padding: "0 4em 0 4em"}}>
                <TaskTop task={task} />
                <div style={{marginTop: "1em"}}>
                <SimpleGrid className="task__body__grid" templateColumns={{xl: "2fr 1fr", lg: "1fr 1fr", md: "1fr", sm: "1fr"}} spacing="40px">
                    <Box style={{boxSizing: "border-box", width: "100%"}} className="">
                        <TaskImages task={task} />
                        <TaskDetails task={task} />
                        <TaskDescription task={task} />
                    </Box>
                    <Box>
                        <div className="task__fixed__box">
                        <BidForm task={task} />
                        </div>
                    </Box>
                </SimpleGrid>
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default observer(TaskPage);