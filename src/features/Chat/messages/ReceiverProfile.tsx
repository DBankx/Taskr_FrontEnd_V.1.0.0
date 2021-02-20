import React from "react";
import { IUser } from "../../../infrastructure/models/auth";
import {observer} from "mobx-react-lite";
import { Box, Button, HStack, Image } from "@chakra-ui/react";
import {FlagIcon, TaskListingIcon} from "../../../infrastructure/icons/Icons";
import Rater from "../../../application/common/Rater";
import {Link} from "react-router-dom";

interface IProps{
    user: IUser;
}

const ReceiverProfile = ({user}: IProps) => {
    return (
        <Box className="task__bid__form__card message__receiver">
            <HStack spacing="10px">
                <Image src={user.avatar} className="avatar avatar__nm" alt="receiver-avatar"  />
                <Box style={{lineHeight: "1.5em"}}>
                <p className="text__darker">{user.userName}</p>
                    <HStack>
                        <Rater boxSize={5} justifyContent="flex-start" rating={4} /> 
                        <span className="text__darker">4.5 <span className="text__silent">(2K+ reviews)</span></span>
                    </HStack>
                </Box>
            </HStack>
            
            <Box mt={8}>
                <p className="text__blue"><TaskListingIcon boxSize={8} /> View listings</p>
            </Box>

            <p className="text__silent"><FlagIcon /> Report user</p>

            <Box mt={8}>
                <Button className="btn btn__bg btn__full-width btn__silent" as={Link} to={`/public-profile/${user.id}`}>View profile</Button>

            </Box>
        </Box>
    )
}

export default observer(ReceiverProfile);