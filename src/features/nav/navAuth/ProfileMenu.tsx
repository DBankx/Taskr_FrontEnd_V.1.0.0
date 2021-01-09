import React, {useContext} from "react";
import {IUser} from "../../../infrastructure/models/auth";
import {Box, HStack, Menu, MenuButton,MenuItem, MenuList, Image} from "@chakra-ui/react";
import {ChevronDownIcon} from "../../../infrastructure/icons/Icons";
import { observer } from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootstore";

interface IProps{
    user: IUser
}

const ProfileMenu : React.FC<IProps> = ({user}) => {
    const {logOutUser} = useContext(rootStoreContext).authStore;
    return (
        <Menu size="large">
            <MenuButton as={Box} isLazy={true}>
                <HStack spacing="10px">
                    <Image src={user.avatar} alt="user_avatar" borderRadius="full" boxSize="40px" />
                    <ChevronDownIcon boxSize={8} />
                </HStack>
            </MenuButton>
            <MenuList>
                    <MenuItem>My Tasks</MenuItem>
                    <MenuItem>Bids / Offers</MenuItem>
                    <MenuItem>My Orders </MenuItem>
                    <MenuItem>Watchlist</MenuItem>
                    <MenuItem>Saved runners</MenuItem>
                    <MenuItem>My Profile</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={() => logOutUser()}>Logout</MenuItem>
            </MenuList>
        </Menu> 
    )
}

export default observer(ProfileMenu);