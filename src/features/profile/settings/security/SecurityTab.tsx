import React from "react";
import {observer} from "mobx-react-lite";
import {Box, Divider, SimpleGrid, Button} from "@chakra-ui/react";
import {IUser} from "../../../../infrastructure/models/auth";
import {IPrivateProfile} from "../../../../infrastructure/models/profile";
import SecurityForm from "./SecurityForm";

interface IProps{
    user: IUser;
    privateProfile: IPrivateProfile;
}

const SecurityTab : React.FC<IProps> = ({privateProfile}) => {
    return (
        <Box className="task__bid__form__card">
            <SecurityForm />
            <Divider mt={4} mb={4} />
            <SimpleGrid templateColumns={{xl: "1fr 2fr", lg: "1fr 2fr", md: "1fr 2fr", sm: "1fr"}}>
                <Box>
                <p className="text__darker">Email verification</p>
                    <span className="text__primary text__bold" style={{display: "block", fontSize: "0.7em", textTransform: "uppercase"}}>Recommended</span>
                </Box>
                {!privateProfile.emailConfirmed ? <Box>
                <p className="text__darker">Your email is not yet verified. Click verify now to complete email verification</p>
                    <Button mt={4} className="btn btn__nm btn__primary">Verify now</Button>
                </Box> : <p className="text__light__dark">Your email is confirmed!</p>}
            </SimpleGrid>
        </Box>
)
}

export default observer(SecurityTab);