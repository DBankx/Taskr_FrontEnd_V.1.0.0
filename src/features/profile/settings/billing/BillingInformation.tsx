import {Box, SimpleGrid, Button} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import {IUser} from "../../../../infrastructure/models/auth";
import {IPrivateProfile} from "../../../../infrastructure/models/profile";

interface IProps{
    user: IUser;
    privateProfile: IPrivateProfile;
}

const BillingInformation : React.FC<IProps> = () => {
    return (
        <Box className="task__bid__form__card">
            <SimpleGrid templateColumns={{xl: "1fr 2fr", lg: "1fr 2fr", md: "1fr 2fr", sm: "1fr"}}>
                <p>Bank Account</p>
                <Box>
                <p className="text__light__dark">You havent added a bank account to be paid</p>
                    <Button className="btn btn__nm btn__primary">Add bank account</Button>
                </Box>
            </SimpleGrid>
        </Box>
)
}

export default observer(BillingInformation);