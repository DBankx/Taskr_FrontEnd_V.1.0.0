import {Box, SimpleGrid, Button, HStack} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, {useState} from "react";
import {IUser} from "../../../../infrastructure/models/auth";
import {IPrivateProfile} from "../../../../infrastructure/models/profile";
import BankAccountForm from "./BankAccountForm";
import {BankIcon} from "../../../../infrastructure/icons/Icons";

interface IProps{
    user: IUser;
    privateProfile: IPrivateProfile;
}

const BillingInformation : React.FC<IProps> = ({privateProfile}) => {
    const [bankFormIsActive, setIsActiveBankForm] = useState(false);
    return (
        <Box className="task__bid__form__card">
            <SimpleGrid templateColumns={{xl: "1fr 2fr", lg: "1fr 2fr", md: "1fr 2fr", sm: "1fr"}}>
                <p>Active Bank Account</p>
                {privateProfile.bankAccount ? (
                    <Box className="bank__account">
                        <HStack justifyContent="space-between">
                            <Box>
                                <p style={{color: "#fff"}} className="text__bold">{privateProfile.bankAccount.accountHolderName}</p> 
                                <p style={{color: "#fff", marginTop: "1em"}} className="text__white">{privateProfile.bankAccount.accountNumber} - {privateProfile.bankAccount.bankName}</p>
                            </Box>
                            <BankIcon boxSize="2em" color="#fff" />
                        </HStack>
                    </Box>
                ) : <Box>
                    {bankFormIsActive ? <BankAccountForm setBankForm={setIsActiveBankForm} /> : (
                        <Box>
                        <p className="text__light__dark">You havent added a bank account to be paid</p>
                    <Button className="btn btn__nm btn__primary" onClick={() => setIsActiveBankForm(true)}>Add bank account</Button>
                        </Box>
                        )}
                </Box>}
            </SimpleGrid>
        </Box>
)
}

export default observer(BillingInformation);