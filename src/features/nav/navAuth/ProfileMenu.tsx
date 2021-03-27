import React, {useContext} from "react";
import {IUser} from "../../../infrastructure/models/auth";
import {Box, HStack, Menu, MenuButton,MenuItem, MenuList, Image} from "@chakra-ui/react";
import {ChevronDownIcon} from "../../../infrastructure/icons/Icons";
import { observer } from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootstore";
import {history} from "../../../index";
import {Link} from "react-router-dom";

interface IProps{
    user: IUser
}

const ProfileMenu : React.FC<IProps> = ({user}) => {
    const {logOutUser} = useContext(rootStoreContext).authStore;
    return (
        <Menu size="large" isLazy={true} >
            <MenuButton as={Box} >
                <HStack spacing="10px">
                    <Image src={user.avatar} alt="user_avatar" borderRadius="full" boxSize="40px" />
                    <ChevronDownIcon boxSize={8} />
                </HStack>
            </MenuButton>
            <MenuList   minWidth="180px" className="nav__auth__box">
                    <MenuItem onClick={() => history.push("/profile")}>My Tasks</MenuItem>
                    <MenuItem as={Link} to="/profile?tab=1">My Orders </MenuItem>
                    <MenuItem as={Link} to="/profile?tab=2">Watchlist</MenuItem>
                    <MenuItem as={Link} to="/profile?tab=3">My Profile</MenuItem>
                <MenuItem as={Link} to="/profile?tab=4">Account Settings</MenuItem>
                    <MenuItem onClick={() => logOutUser()}>Logout</MenuItem>
            </MenuList>
        </Menu> 
    )
}

export default React.memo(observer(ProfileMenu));