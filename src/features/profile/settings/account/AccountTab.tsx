import React from "react";
import {observer} from "mobx-react-lite";
import {Box, Button, Divider, HStack, Image, SimpleGrid} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {IUser} from "../../../../infrastructure/models/auth";
import AccountForm from "./AccountForm";
import SEO from "../../../../application/appLayout/SEO";
import {IPrivateProfile} from "../../../../infrastructure/models/profile";

interface IProps{
    user: IUser;
    privateProfile: IPrivateProfile;
}

const AccountTab : React.FC<IProps> = ({user, privateProfile}) => {
    return(
        <Box className="task__bid__form__card">
            <SEO title="settings - Account" />
            <p className="text__md" style={{textAlign: "right"}}>Want to update your public profile? <Link to="/profile?tab=5" className="text__blue">Go to profile</Link></p>
            <Divider mt={3} mb={3} />
            <HStack spacing="30px" mt={4} mb={4}>
                <Image src={user.avatar} borderRadius="full" boxSize="80px" alt="avatar" />
                <Box>
                <Button disabled className="btn btn__white">Change profile photo</Button>
                    <small style={{display: "block"}} className="text__silent">Profile photo cannot be changed now</small>
                </Box>
            </HStack>
            <AccountForm privateProfile={privateProfile} />
            <Divider mt={3} mb={3} />
            <SimpleGrid templateColumns={{xl: "1fr 2fr", lg: "1fr 2fr", md: "1fr 2fr", sm: "1fr"}}>
                <p className="text__bold">Deactivate Account</p>
                <Box>
                    <p className="text__darker">What happens when you deactivate / close your account?</p>
                    <ul>
                        <li className="text__light__dark"><small>Your tasks, bids and offers wont be shown on Taskr anymore.</small></li>
                        <li className="text__light__dark"><small>All active bids will be ended and closed.</small></li>
                        <li className="text__light__dark"><small>You won&apos;t be able to re-activate your bids.</small></li>
                        <li className="text__light__dark"><small>You will not be able to access any authenticated services or actions.</small></li>
                    </ul>
                    <Button mt={5} style={{float: "right"}} className="btn btn__nm btn__red">
                        Deactivate account
                    </Button>
                </Box>
            </SimpleGrid>
        </Box>
)
}

export default observer(AccountTab);