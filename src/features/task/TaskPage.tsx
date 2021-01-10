import {useMediaQuery, Alert ,AlertIcon, Box, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {Link, RouteComponentProps } from "react-router-dom";
import FullPageSpinner from "../../application/appLayout/FullPageSpinner";
import SEO from "../../application/appLayout/SEO";
import rootStoreContext from "../../application/stores/rootstore";
import TaskImages from "./TaskImages";
import TaskTop from "./TaskTop";
import TaskDetails from "./TaskDetails";
import TaskDescription from "./TaskDescription";
import BidForm from "../bid/BidForm";
import TaskCreatorDetails from "./TaskCreatorDetails";

const TaskPage : React.FC<RouteComponentProps<{id: string}>> = ({match}) => {
    const {getTaskById, loadingInitial, task} = useContext(rootStoreContext).jobStore;
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const [isSmallerScreen] = useMediaQuery( "(max-width: 800px)");
    
    useEffect(() => {
        if(!task || task.id !== match.params.id){
            getTaskById(match.params.id)
        }
    }, [getTaskById, match.params.id, task])
    
    if(loadingInitial || !task) return <FullPageSpinner />
    
    return (
        <div>
        <div className="container">
            <SEO title={task.title} />
            
            <div className="main">
                <div style={{marginBottom: "1em"}}>
                    {task.isBidActive && <Alert status="info" variant="left-accent">
                        <AlertIcon/>
                        You have an active bid on this task. <Link to="/" className="text__blue" style={{marginLeft: "0.3em"}}>View &#8594;</Link>
                    </Alert>}
                </div>
                <div style={isMobile ? {} : {padding: "0 4em 0 4em"}}>
                    
                <TaskTop task={task} />
                <div style={{marginTop: "1em"}}>
                <SimpleGrid className="task__body__grid" templateColumns={{xl: "2fr 1fr", lg: "1.6fr 1fr", md: "1fr", sm: "1fr"}} spacing="40px">
                    <Box style={{boxSizing: "border-box", width: "100%"}} className="">
                        <TaskImages task={task} />
                        <TaskDetails task={task} />
                        {isSmallerScreen && (
                            <div className="task__details">
                                <BidForm task={task} />
                            </div>
                        )}
                        <TaskDescription task={task} />
                        <TaskCreatorDetails task={task} />
                    </Box>
                    <Box>
                        {!isSmallerScreen && 
                        <div className="task__fixed__box">
                            <BidForm task={task}/>
                        </div>
                        }
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