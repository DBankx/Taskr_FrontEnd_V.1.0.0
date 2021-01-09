import React from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import {Box, Divider, HStack, Image, SimpleGrid, Spacer } from "@chakra-ui/react";
import {EmailIcon, StarIcon} from "../../infrastructure/icons/Icons";
import {useMediaQuery} from "react-responsive";

interface IProps{
    task: ITask
}

const TaskCreatorDetails : React.FC<IProps> = ({task}) => {
    const isMobile = useMediaQuery({query: "(max-width: 500px)"});
    return (
        <div className="task__details task__bid__form__card">
            <h3 className="task__description__title">About this taskr</h3> 
          
            <HStack style={isMobile ? {display: "block", textAlign: "center"} : {}} spacing={isMobile ? "0" :"15px"}>
                <Image className="task__avatar" borderRadius="full" boxSize="80px" alt="tasker-avatar" src={task.creator.avatar} />
                <div>
                    <p className="task__avatar__username text__darker">{task.creator.userName}</p>
                    <p style={{fontSize: "15px", color: "#FFC850"}}><StarIcon boxSize={5} /> <StarIcon boxSize={5} /> <StarIcon boxSize={5} /> <StarIcon boxSize={5} /> 4.0 <span style={{color: "#62677D"}}>(12) reviews</span></p>
                    <div className="reveal__box">
                        <HStack>
                            <EmailIcon mr={4} boxSize={8} color="#565C5D" />
                            <Box mr={6}>
                                <span className="reveal__message">XXXXXXXXXX</span>
                            </Box>
                            <Spacer />
                            <p style={{color: "#6f727f", fontSize: "14px"}}>Reveal</p>
                        </HStack>
                    </div>
                </div>
            </HStack>
            
            <div style={{margin: "1em 0"}}>
                <SimpleGrid templateColumns={{xl: "1fr 1fr", lg: "1fr 1fr", md: "1fr 1fr", sm: "1fr 1fr"}}>
                    <Box>
                        <p className="text__light__dark">From</p>
                        <p className="text__darker">Pakistan</p>
                    </Box>
                    
                    <Box>
                        <p className="text__light__dark">Member Since</p>
                        <p className="text__darker">{new Date(task.creator.createdAt).getFullYear()}</p>
                    </Box>
                    
                    <Box>
                        <p className="text__light__dark">Tasks</p>
                        <p className="text__darker">20 Listings</p>
                    </Box>
                    
                    <Box>
                        <p className="text__light__dark">Completed</p>
                        <p className="text__darker">0</p>
                    </Box>
                </SimpleGrid>
                <Divider />

                <div className="text__darker">{task.creator.bio}</div>
            </div>
            
            
        </div>
    )
}

export default observer(TaskCreatorDetails);