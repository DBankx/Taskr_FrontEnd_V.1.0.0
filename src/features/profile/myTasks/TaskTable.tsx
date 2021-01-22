import {Table, Td, Th, TableCaption, Tr, Tbody, Thead, Image, Link, Menu, Button, MenuButton, MenuList, MenuItem, Checkbox, HStack} from "@chakra-ui/react";
import React from "react";
import {ITask} from "../../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import noImage from "../../../assets/images/No_Image_Available.jpg";
import {Link as Linker} from "react-router-dom";
import dayjs from "dayjs";
import {
    BidIcon,
    CheckmarkIcon,
    ChevronDownIcon,
    CloseIcon,
    EditIcon,
    TrashIcon
} from "../../../infrastructure/icons/Icons";
import {history} from "../../../index";

interface IProps{
    tasks: ITask[]
}

// TODO - bids & watch not shown
// TODO - all option buttons not working

const TaskTable : React.FC<IProps> = ({tasks}) => {
    return (
        <div className="profile__table__container">
            <Table variant="simple">
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>Title</Th>
                        <Th>Budget</Th>
                        <Th>Expires</Th>
                        <Th>Bids</Th>
                        <Th>Views</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tasks.map((task) => (
                        <Tr key={task.id}>
                            <Td><HStack spacing="10px">
                                <Checkbox />
                                <Image boxSize="100px" src={task.photos.length > 0 ? task.photos[0].url : noImage } alt="task" />
                            </HStack>
                            </Td>
                            <Td style={{position: "relative"}}>
                                <div className="profile__table__text">
                                    <p>{task.title}</p>
                                   <Link className="text__blue" style={{marginTop: "1em", display: "block"}} to={`/task/${task.id}`} as={Linker}>view</Link> 
                                    </div>
                            </Td>
                            <Td>
                                <div className="profile__table__text ">
                                    <p className="text__green text__bigger__md">${task.initialPrice}
                                    </p>
                                    </div>    
                            </Td>
                            <Td>
                                <div className="profile__table__text">
                                    <p>{dayjs(task.deliveryDate).format("MMM DD YYYY")}</p>
                                    <p style={{marginTop: "1em"}} className="text__silent">Posted on {dayjs(task.createdAt).format("MMM DD YYYY")}</p>
                                </div>
                            </Td>
                            <Td>
                                <div className="profile__table__text">
                                    <p>200</p>
                                    <Link  className="text__blue" style={{marginTop: "1em", display: "block"}} as={Linker} to={`/view-bids/${task.id}`}>View all</Link>
                                </div>
                            </Td>
                            <Td>
                                <div className="profile__table__text">
                                    <p>200</p>
                                </div>
                            </Td>
                            <Td>
                                <div className="profile__table__text">
                                <Menu isLazy={true}>
                                    <MenuButton className="menu__btn__outlined" as={Button} rightIcon={<ChevronDownIcon />}>
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
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>  
        </div>
    )
}

export default observer(TaskTable);