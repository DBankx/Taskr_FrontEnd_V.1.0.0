import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootstore";
import InlineLoader from "../../../application/appLayout/InlineLoader";
import TaskTable from "./TaskTable";
import {TaskStatus} from "../../../infrastructure/enums/taskStatus";
import {HStack, useMediaQuery, Image, MenuButton, Button, MenuList, MenuItem, Menu, Link as Linker} from "@chakra-ui/react";
import dayjs from "dayjs";
import {
    BidIcon, CalendarIcon,
    CheckmarkIcon,
    ChevronDownIcon,
    CloseIcon,
    EditIcon,
    TrashIcon
} from "../../../infrastructure/icons/Icons";
import {history} from "../../../index";
import { Link } from "react-router-dom";

const ActiveTasks = () => {
    const {loadingInitial, profileActiveTasks, getProfileTasks} = useContext(rootStoreContext).profileStore;
    useEffect(() => {
        getProfileTasks(TaskStatus.Active);
    }, [getProfileTasks])
   const [isSmallerScreens] = useMediaQuery("(max-width: 900px)"); 
    if(loadingInitial || profileActiveTasks === null) return <InlineLoader />
    
    return (
        <div>
            {profileActiveTasks.length <= 0 ? (
                <div>
                    <h2 className="profile__message__heading">You have no active tasks at the moment.</h2>
                    <p className="profile__message__content">Why not <Linker className="text__blue" as={Link} to="/create-task/details">post a task</Linker> now?</p>
                </div>
            ) : isSmallerScreens ? (
                <div>
                    {profileActiveTasks.map((task) => (
                        <div  style={{position: "relative"}} key={task.id} className="profile__task__small__box task__bid__form__card text__darker">
                            <div className="task__status__label">OPEN</div>
                            <HStack spacing="10px">
                                { task.photos.length > 0 && <Image src={ task.photos[0].url} boxSize="60px" />} 
                                <div className="truncate__3 text__bigger__md">{task.title}</div>
                            </HStack>
                            <HStack justifyContent="space-between">
                            <div style={{lineHeight: "17px" , margin: "0.5em 0"}}>
                            <small><CalendarIcon boxSize={5} color="#3D3373" /> Ends {dayjs(task.deliveryDate).format("MMM. DD, YYYY")}</small>
                                <small style={{fontSize: "0.7em", display: "block"}} className="text__silent">Posted {dayjs(task.createdAt).format("MMM. DD, YYYY")}</small>
                            </div>
                                <Link className="text__blue" to={`task/${task.id}`}>view</Link>
                            </HStack>
                            <HStack spacing="10px">
                            <p className="text__green text__md">${task.initialPrice}</p>
                                <p>•</p>
                                <p>200 Bids</p>
                                <p>•</p>
                                <p className="text__dark__grey">200+ views</p>
                            </HStack>

                            <div style={{marginTop: "0.5em"}}>
                            <Menu placement="bottom" matchWidth={true} isLazy={true}>
                                <MenuButton className="menu__btn__outlined btn__full-width" as={Button} rightIcon={<ChevronDownIcon />}>
                                    Actions
                                </MenuButton>
                                <MenuList className="profile__tasks__action__menu">
                                    <MenuItem><EditIcon mr={2} boxSize={5} /> Edit</MenuItem>
                                    <MenuItem><CloseIcon mr={2} boxSize={5} /> End Task</MenuItem>
                                    <MenuItem onClick={() => history.push(`/view-bids/${task.id}`)}><BidIcon mr={2} boxSize={5} /> View all bids</MenuItem>
                                    <MenuItem><CheckmarkIcon mr={2} boxSize={5} /> Assign</MenuItem>
                                    <MenuItem><TrashIcon mr={2} boxSize={5} /> Delete</MenuItem>
                                </MenuList>
                            </Menu>
                            </div>
                        </div>
                        ))}
                </div>
                        ) :
                <div className="task__bid__form__card">
           <TaskTable tasks={profileActiveTasks} />
                </div>}
        </div>
    )
}

export default observer(ActiveTasks);