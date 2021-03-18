import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootstore";
import InlineLoader from "../../../application/appLayout/InlineLoader";
import TaskTable from "./TaskTable";
import {TaskStatus} from "../../../infrastructure/enums/taskStatus";
import {Link as Linker, useMediaQuery} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import TaskMobile from "./TaskMobile";

interface IProps{
    taskStatus: TaskStatus;
}

const ProfileTasksPane = ({taskStatus}: IProps) => {
    const {loadingInitial, profileTasks, getProfileTasks} = useContext(rootStoreContext).profileStore;
    useEffect(() => {
        getProfileTasks(taskStatus);
    }, [getProfileTasks, taskStatus])
   const [isSmallerScreens] = useMediaQuery("(max-width: 900px)"); 
    if(loadingInitial || profileTasks === null) return <InlineLoader />
    
    return (
        <div>
            {profileTasks.length <= 0 ? (
                <div>
                    <h2 className="profile__message__heading">You have no {taskStatus === TaskStatus.Active ? "active": taskStatus === TaskStatus.Assigned ? "assigned" : taskStatus === TaskStatus.Completed ? "completed" : "inactive"} tasks at the moment.</h2>
                    <p className="profile__message__content">Why not <Linker className="text__blue" as={Link} to="/create-task/details">post a task</Linker> now?</p>
                </div>
            ) : isSmallerScreens ? (
                <div>
                    <TaskMobile tasks={profileTasks} />
                </div> 
                        ) :
                <div className="task__bid__form__card no__padding">
           <TaskTable tasks={profileTasks} taskStatus={taskStatus
           } />
                </div>}
        </div>
    )
}

export default observer(ProfileTasksPane);