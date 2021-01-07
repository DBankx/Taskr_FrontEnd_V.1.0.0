import React from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";

interface IProps{
    task: ITask
}

const TaskOwnerContactForm : React.FC<IProps> = ({task}) => {
    return (
           <div>
               
           </div> 
    )
}

export default observer(TaskOwnerContactForm);