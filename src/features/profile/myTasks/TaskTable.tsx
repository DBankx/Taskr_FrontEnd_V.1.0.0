import {
    Table,
    Td,
    Th,
    Tr,
    Tbody,
    Thead,
    Image,
    Link,
    Menu,
    Button,
    MenuButton,
    MenuList,
    MenuItem,
    HStack,
    Box, Tooltip, Divider, Center, Spinner, Badge
} from "@chakra-ui/react";
import React, {useContext, useState} from "react";
import {ITask} from "../../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import noImage from "../../../assets/images/No_Image_Available.jpg";
import {Link as Linker} from "react-router-dom";
import dayjs from "dayjs";
import {
    ChevronDownIcon,
    EditIcon,
    TrashIcon
} from "../../../infrastructure/icons/Icons";
import rootStoreContext from "../../../application/stores/rootstore";
import {TaskStatus} from "../../../infrastructure/enums/taskStatus";

interface IProps{
    tasks: ITask[];
    taskStatus: TaskStatus;
}

// TODO - bids & watch not shown
// TODO - all option buttons not working

const TaskTable : React.FC<IProps> = ({tasks, taskStatus}) => {
    const {deleteTask, deletingTask} = useContext(rootStoreContext).taskStore;
    const [selectedTask, setSelectedTask] = useState("");
    return (
        <Box>
            <HStack spacing="10px" p="1em">
                <p className="text__darker text__upper text__bold">{taskStatus === TaskStatus.Active ? "Active": taskStatus === TaskStatus.Assigned ? "Assigned" : taskStatus === TaskStatus.Completed ? "Completed" :  "Inactive"} tasks </p>
                <Tooltip hasArrow style={{background: "rgb(41, 43, 50)", fontSize: "0.8em"}} label={taskStatus === TaskStatus.Active ? "These are tasks that are active and can get bids on them": taskStatus === TaskStatus.Assigned ? "These are tasks you have assigned to a runner" : taskStatus === TaskStatus.Completed ? "These are tasks that have been completed" :  "These are tasks that have passed the delivery date and can be renewed"} aria-label="A tooltip">
                    <Box className="circle-question">?</Box>
                </Tooltip>
            </HStack>
            <Divider mb={0} />
            <Box className="watchlist__table small__heading">
                <Table variant="simple" size="md">
                <Thead>
                    <Tr>
                        <Th  className="watchlist__heading"></Th>
                        <Th  className="watchlist__heading">BUDGET</Th>
                        <Th  className="watchlist__heading">ENDS</Th>
                        <Th  className="watchlist__heading">BIDS</Th>
                        <Th  className="watchlist__heading">VIEWS</Th>
                        <Th  className="watchlist__heading">ACTION</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tasks.map((task) => (
                        <Tr className="hover__secondary" key={task.id}>
                            <Td maxWidth="400px">
                                <HStack spacing="20px">
                                <Image width="50px" height="42px" src={task.photos.length > 0 ? task.photos[0].url : noImage } alt="task" />
                                <Box>
                                        <Link className="truncate__3  link" to={`/task/${task.id}`} as={Linker} >{task.title}</Link>
                                    <small style={{marginTop: "1em", display: "block"}} className="text__bold text__silent">{task.postCode ? "In person" : "Online"}</small>
                                </Box>
                            </HStack>
                            </Td>
                            <Td>
                                    <p className="text__green text__bigger__md">${task.initialPrice}
                                    </p>
                            </Td>
                            <Td>
                                {taskStatus === TaskStatus.Completed ? <Badge className="badge__bg" fontSize="2em" colorScheme="green">Completed</Badge> : taskStatus === TaskStatus.InActive ? <Badge className="badge__bg" colorScheme="red">Ended</Badge> :<p>{dayjs(task.deliveryDate).format("MMM DD YYYY")}</p>}
                                    <small style={{marginTop: "1em", display: "block"}} className="text__silent text__bold">Posted on {dayjs(task.createdAt).format("MMM DD YYYY")}</small>
                            </Td>
                            <Td>
                                    <p>200</p>
                                    <Link  className="text__blue link" style={{marginTop: "1em", display: "block"}} as={Linker} to={`/view-bids/${task.id}`}>view all</Link>
                            </Td>
                            <Td>
                                    <p>200</p>
                            </Td>
                            <Td>
                                {deletingTask && selectedTask === task.id ? <Center>
                                    <Spinner />
                                </Center> :<Menu isLazy={true}>
                                    <MenuButton className="menu__btn__outlined" as={Button} rightIcon={<ChevronDownIcon />}>
                                        Actions
                                    </MenuButton>
                                    <MenuList className="profile__tasks__action__menu">
                                        <MenuItem><EditIcon mr={2} boxSize={5} /> Edit</MenuItem>
                                        <MenuItem onClick={() => {
                                            setSelectedTask(task.id);
                                            deleteTask(task.id);
                                        }}><TrashIcon mr={2} boxSize={5} /> Delete</MenuItem>
                                    </MenuList>
                                </Menu>}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>  
        </Box>
        </Box>
    )
}

export default observer(TaskTable);