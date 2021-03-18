import React from "react";
import {observer} from "mobx-react-lite";
import {Box, Button, HStack, Image, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {
    BidIcon,
    CalendarIcon,
    CheckmarkIcon,
    ChevronDownIcon,
    CloseIcon,
    EditIcon, TrashIcon
} from "../../../infrastructure/icons/Icons";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {history} from "../../../index";
import {ITask} from "../../../infrastructure/models/task";

interface IProps{
    tasks: ITask[];
}

const TaskMobile = ({tasks}: IProps) => {
    return (
        <Box>
            {tasks.map((task) => (
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
        </Box>
    )
}

export default observer(TaskMobile);