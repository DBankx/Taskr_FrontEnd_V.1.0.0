import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootstore";
import InlineLoader from "../../../application/appLayout/InlineLoader";
import TaskTable from "./TaskTable";

const ActiveTasks = () => {
    const {loadingInitial, profileActiveTasks, getProfileTasks} = useContext(rootStoreContext).profileStore;
    useEffect(() => {
        getProfileTasks("active");
    }, [getProfileTasks])
    
    if(loadingInitial || profileActiveTasks === null) return <InlineLoader />
    
    return (
        <div className="task__bid__form__card">
           <TaskTable tasks={profileActiveTasks} /> 
        </div>
    )
}

export default observer(ActiveTasks);