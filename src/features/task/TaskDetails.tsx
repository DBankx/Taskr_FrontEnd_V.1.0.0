import React from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {Divider, HStack } from "@chakra-ui/react";
import MoneyIcon, {
    BidIcon,
    BinocularsIcon,
    DeliveryIcon,
    EyeIcon,
    LocationIcon
} from "../../infrastructure/icons/Icons";
// import BidForm from "../bid/BidForm";

dayjs.extend(relativeTime);

interface IProps{
    task: ITask
}

const TaskDetails : React.FC<IProps> = ({task}) => {
    const devDate = new Date(task.deliveryDate);
    const deliveryDateOption = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <div className="task__details">
            <HStack>
                <LocationIcon boxSize={8} color="#3D3373" />
                <div>
                    <p className="text__light__dark task__posted">Posted about {dayjs(task.createdAt).fromNow()}</p>
                    <p className="text__darker task__posted">{`${task.city && task.city} ${task.postCode && "/ " + task.postCode.toUpperCase()}`} {task.postCode && <span className="text__blue task__posted__map">(View on Map)</span>}</p>
                </div>
            </HStack>
            
            <HStack style={{margin: "1em 0"}}>
                <DeliveryIcon boxSize={9} color="#3D3373" />
                    <p className="text__darker task__posted">Ends {dayjs(task.deliveryDate).from(Date.now())} | {devDate.toLocaleDateString("en-US", deliveryDateOption)}</p>
            </HStack>
            
            <Divider />
            
            <div style={{margin: "1em 0"}}>
                <p className="text__dark__grey query__price__label a"><MoneyIcon boxSize={8} color="#37a864" style={{marginRight: "0.3em"}} />Starting Bid: <span className="task__price">${task.initialPrice}</span></p>
                {/*<BidForm task={task} />*/}
            </div>
            
            <HStack className="task__labels" spacing="20px" style={{margin: "1em 0"}}>
                
                <HStack className="label">
                    <BidIcon boxSize={6} color="#fff" />
                    <p>10 Bids</p>
                </HStack>
                
                <HStack className="label">
                    <BinocularsIcon boxSize={6} color="#fff" />
                    <p>5 Watching</p>
                </HStack>

                <HStack className="label">
                    <EyeIcon boxSize={6} color="#fff" />
                    <p>{task.views} Views</p>
                </HStack>
            </HStack>
        </div>
    )
}

export default observer(TaskDetails);