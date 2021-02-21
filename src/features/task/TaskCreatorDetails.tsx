import React, {useContext} from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import {Box, HStack, Image, useMediaQuery, Button } from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {PriceTagIcon, StarIcon, TaskListingIcon, UserIcon} from "../../infrastructure/icons/Icons";
import { Formik } from "formik";
import rootStoreContext from "../../application/stores/rootstore";
import dayjs from "dayjs";

interface IProps{
    task: ITask
}

const TaskCreatorDetails : React.FC<IProps> = ({task}) => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
    const {startChatWithUser} = useContext(rootStoreContext).chatStore;
    return (
        <Box className="task__details task__bid__form__card">
            <HStack style={isMobile ? {display: "block", textAlign: "center"} : {}} spacing={isMobile ? "0" :"15px"}>
                <Image className="task__avatar" borderRadius="full" boxSize="50px" alt="tasker-avatar" src={task.creator.avatar} />
                <Box>
                    <Link to={`/public-profile/${task.creator.id}`} className="task__avatar__username text__darker link">{task.creator.userName}</Link>
                    <p style={{fontSize: "15px", color: "#FFC850"}}><StarIcon boxSize={5} /> <StarIcon boxSize={5} /> <StarIcon boxSize={5} /> <StarIcon boxSize={5} /> 4.0 <span style={{color: "#62677D"}}>(12) reviews</span></p>
                </Box>
            </HStack>
            
            <Box style={{margin: "1em 0"}}>
                <HStack mb={4}>
                    <PriceTagIcon boxSize={8} color="#373373" />
                    <p className="text__darker">Creator</p>
                </HStack>
              <HStack mb={4}>
                  <TaskListingIcon boxSize={8} />
                  <p className="text__blue link">View listings</p>
              </HStack>
                <HStack>
                    <UserIcon boxSize={8} color="#373373"  />
                    <p className="text__darker">Joined since {dayjs(task.creator.createdAt).format("MMM YYYY")}</p>
                </HStack>
            </Box>
            
            {!task.isOwner && <Box>
                <p className="text__darker text__md">Contact {task.creator.userName}</p>
                {!task.isChatActive ? (
                    <Box>
                <Formik initialValues={{text: "Hi, I’m interested. Please contact me."}} onSubmit={values => startChatWithUser(task.id, task.creator.id, values)}>
                    {({
                        handleSubmit,
                        values,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        dirty
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <Box className="form__field">
                            <label data-testid="label"  className="form__textarea__label" id="message-Your Message" htmlFor="text">Your Message</label>
                            <textarea data-testid="input"  value={values.text} onChange={handleChange} onBlur={handleBlur} className="form__textarea" id="text" rows={2} name="text" />
                            </Box>
                            <HStack justifyContent="flex-end">
                                <Button isLoading={isSubmitting} disabled={isSubmitting || !dirty} type="submit" className="btn btn__primary btn__nm">Send Message</Button>
                            </HStack>
                        </form>
                    )}
                </Formik>
                    </Box>
                    ) : (
                        <Box>
                    <p className="text__silent">You currently have a conversation about this task with {task.creator.userName}</p>
                    <Button as={Link} to="/inbox" mt={4} className="btn btn__green btn__nm">Go to my conversation</Button>
                    </Box>
                    )}
            </Box> 
            }
        </Box>
    )
}

export default observer(TaskCreatorDetails);