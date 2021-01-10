import React from "react";
import {ITask} from "../../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import Countdown from "react-countdown";

interface IProps{
    task: ITask
}

const TaskTimer : React.FC<IProps> = ({task}) => {
    const Completed = () => <span className="text__error">Ended</span>
    const renderer = (props: any) => {
        const {days, hours, minutes, completed} = props;
        if(completed){
            return <Completed />
        } else {
            return <span>{days} days {hours} hours {minutes} mins</span>
        }
    }
    return (
        <Countdown date={task.deliveryDate} renderer={renderer} />
    )
}

export default observer(TaskTimer);