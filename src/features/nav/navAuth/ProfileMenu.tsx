import React from "react";
import {IUser} from "../../../infrastructure/models/auth";
import {Box, HStack, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Image} from "@chakra-ui/react";
import {ChevronDownIcon} from "../../../infrastructure/icons/Icons";
import { observer } from "mobx-react-lite";

interface IProps{
    user: IUser
}

const ProfileMenu : React.FC<IProps> = ({user}) => {
    return (
        <Menu>
            <MenuButton as={Box} isLazy={true}>
                <HStack spacing="10px">
                    <Image src={user.avatar} alt="user_avatar" borderRadius="full" boxSize="40px" />
                    <ChevronDownIcon boxSize={8} />
                </HStack>
            </MenuButton>
            <MenuList>
                <MenuGroup title="Profile">
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu> 
    )
}

export default observer(ProfileMenu);