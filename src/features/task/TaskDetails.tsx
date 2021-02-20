import React from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {HStack, Wrap, useMediaQuery, SimpleGrid } from "@chakra-ui/react";
import {
    CalendarIcon,
    BidIcon,
    BinocularsIcon,
    EyeIcon,
    LocationIcon
} from "../../infrastructure/icons/Icons";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

interface IProps{
    task: ITask
}

const TaskDetails : React.FC<IProps> = ({task}) => {
    const devDate = new Date(task.deliveryDate);
    const [isMobile, isTablet] = useMediaQuery(["(max-width: 500px)", "(max-width: 991px)"]);
    return (
        <div className={`${task.photos.length > 0 && "task__details"} task__bid__form__card`}>
            <SimpleGrid spacing="10px" templateColumns={{xl: "2.5fr 0.5fr", lg: "2fr 0.4fr", md: "1fr", sm: "1fr"}}>
            <HStack>
                <LocationIcon boxSize={8} color="#3D3373" />
                <div>
                    <p className="text__darker task__posted" style={{fontSize: "17px"}}>{`${task.address && task.address} ${task.postCode && "/ " + task.postCode.toUpperCase()}`} {task.postCode && <span className="text__blue task__posted__map">(View on Map)</span>}</p>
                    <p className="text__light__dark task__posted">Posted about {dayjs(task.createdAt).fromNow()}</p>
                </div>
            </HStack>
                <Link style={isMobile ? {marginTop: "0.5em"} : isTablet ? {textAlign: "left"} : {textAlign: "right"}} to={`/view-bids/${task.id}`} className="text__blue link">
                    View bids
                </Link>
            </SimpleGrid>   
            
            <HStack alignItems="center" style={{margin: "1em 0"}}>
                <CalendarIcon boxSize={7} color="#3D3373" />
                    <p className="text__darker task__posted">Ends {dayjs(task.deliveryDate).from(Date.now())} | {devDate.toUTCString()}</p>
            </HStack>
            
            <Wrap className="task__labels" style={isMobile ? {marginTop: "1em", display: "block"} : {marginTop: "1em"}}>
                
                <HStack className="label">
                    <BidIcon boxSize={6} color="#3e4153" />
                    <p>Bids: {task.bidsCount}</p>
                </HStack>
                
                <HStack className="label">
                    <BinocularsIcon boxSize={6} color="#3e4153" />
                    <p>Watching: {task.watchCount}</p>
                </HStack>

                <HStack className="label">
                    <EyeIcon boxSize={6} color="#3e4153" />
                    <p>Views: {task.views}</p>
                </HStack>
            </Wrap>
        </div>
    )
}

export default observer(TaskDetails);