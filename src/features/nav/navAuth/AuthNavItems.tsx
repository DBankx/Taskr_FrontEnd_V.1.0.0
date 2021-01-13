import React from "react";
import {IUser} from "../../../infrastructure/models/auth";
import {observer} from "mobx-react-lite";
import {Box, HStack } from "@chakra-ui/react";
import ProfileMenu from "./ProfileMenu";
import {BinocularsIcon, ChatIcon, NotificationIcon} from "../../../infrastructure/icons/Icons";
import {history} from "../../../index";

interface IProps{
    user: IUser
}

const AuthNavItems : React.FC<IProps> = ({user}) => {
    return (
        <HStack spacing="30px" alignItems="center">
            <Box>
                <BinocularsIcon boxSize={10} color="#3D3373" />
            </Box>
            <Box>
                <NotificationIcon boxSize={10} color="#3D3373" />
            </Box>
            <Box>
                <ChatIcon boxSize={10} color="#3D3373" />
            </Box>
            <Box>
                <ProfileMenu user={user} />
            </Box>
            <Box>
                <button onClick={() => history.push("/create-task/details")} className="btn btn__primary btn__shadow btn__bold">Post a task</button>
            </Box>
        </HStack>
    )
}

export default observer(AuthNavItems);