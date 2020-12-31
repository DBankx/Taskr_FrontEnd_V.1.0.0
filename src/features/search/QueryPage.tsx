import React, {useContext, useEffect} from "react";
import QueryActions from "./QueryActions";
import rootStoreContext from "../../application/stores/rootstore";
import {observer} from "mobx-react-lite";
import InlineLoader from "../../application/appLayout/InlineLoader";
import QueryBody from "./QueryBody";

const QueryPage = () => {
    
    const {loadingInitial, tasks, getAllJobs, taskQueryValues} = useContext(rootStoreContext).jobStore;
    
    useEffect(() => {
        getAllJobs();
    }, [getAllJobs, taskQueryValues])
    
    
    return (
        <div className="container">
            <div className="main">
                <div>
                <h1 className="text__lg">Results for search</h1>
                    <div className="query__body">
                    <QueryActions />
                        {loadingInitial || tasks === null ? <InlineLoader /> : (
                            <div>
                                <QueryBody tasks={tasks} taskQueryValues={taskQueryValues}/>
                            </div>
                        )}                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(QueryPage);