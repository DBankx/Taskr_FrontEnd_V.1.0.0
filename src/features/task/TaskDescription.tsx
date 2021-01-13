import React, { useState } from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";

interface IProps{
    task: ITask
}

const TaskDescription : React.FC<IProps> = ({task}) => {
    const [showMore, setShowMore] = useState(false);
    return ( 
        <div style={{marginTop: "3em", position: "relative"}} className="task__bid__form__card">
            <div className={!showMore ? "show__more__child" : "show__more__child__released"}>
            <h3 className="task__description__title">Details</h3>
            <p className="task__description__container">{task.description}</p>
            </div>
            <div className={!showMore ? "show__more__fade__out" : "show__more__fade__out__released"}>
            </div>
            <button className="show__more__btn" onClick={() => setShowMore(!showMore)}>{!showMore ? "Show more" : "Show Less"}</button>
        </div>
    )
    
}

export default observer(TaskDescription);