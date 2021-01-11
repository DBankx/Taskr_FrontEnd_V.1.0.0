import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import SEO from "../../../application/appLayout/SEO";
import { Link } from "react-router-dom";
import {RouteComponentProps} from "react-router-dom";
import {ChevronLeftIcon} from "../../../infrastructure/icons/Icons";
import rootStoreContext from "../../../application/stores/rootstore";
import FullPageSpinner from "../../../application/appLayout/FullPageSpinner";
import {Box, SimpleGrid } from "@chakra-ui/react";
import BidInfo from "./BidInfo";
import TaskBidItem from "./TaskBidItem";

interface IBidHistoryPageRouteValues{
    taskId: string
}

const BidHistoryPage : React.FC<RouteComponentProps<IBidHistoryPageRouteValues>> = ({match}) => {
    const {taskId} = match.params;
    const {getTaskBids, bids, loadingInitialBids} = useContext(rootStoreContext).bidStore;
    const {getTaskById, task} = useContext(rootStoreContext).taskStore;
   
    useEffect(() => {
        if(task == null){
            getTaskById(taskId).then(() => getTaskBids(taskId));
        } else{
            getTaskBids(taskId);
        }
    }, [taskId, getTaskBids])
    
    if(bids === null || loadingInitialBids || task === null) return <FullPageSpinner />
    
    return (
        <div className="container">
            <SEO title="task bid history" />
            <div className="main">
              <div className="top__back__button">
                  <Link to={`/task/${taskId}`}><ChevronLeftIcon boxSize={4} color="#2DA3EB" /> Back to task description</Link> 
              </div>  
                <div>
                    <h3 className="text__darker text__lg">Bid history</h3>
                    
                    <div style={{marginTop: "1em"}}>
                        <SimpleGrid spacing="20px" templateColumns={{xl: "2fr 1fr", lg:  "1fr", sm: "1fr", md: "1fr"}}>
                            <Box>
                               <BidInfo bids={bids} task={task} />
                            </Box>
                            <Box>
                                <TaskBidItem task={task} />
                            </Box>
                        </SimpleGrid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(BidHistoryPage);