import React, {useContext, useEffect} from "react";
import QueryActions from "./QueryActions";
import rootStoreContext from "../../application/stores/rootstore";
import {observer} from "mobx-react-lite";
import InlineLoader from "../../application/appLayout/InlineLoader";
import QueryBody from "./QueryBody";
import {StringParam, useQueryParams} from "use-query-params";

const QueryPage = () => {
    const {loadingInitial, tasks, getAllJobs, taskQueryValues, setTasksQueryParams} = useContext(rootStoreContext).jobStore;
    const [queryParams] = useQueryParams({
        title: StringParam,
        city: StringParam
    }) 
    
    setTasksQueryParams(queryParams.title!);
    useEffect(() => {
        getAllJobs();
    }, [getAllJobs, taskQueryValues, queryParams])
    
    return (
        <div className="container">
            <div className="main">
                <div>
                <h1 className="text__lg">Results for {`"${queryParams.title}"`}</h1>
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