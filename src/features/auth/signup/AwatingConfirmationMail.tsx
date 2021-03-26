import { Box, Center, Image, Stack } from "@chakra-ui/react";
import React from "react";
import {observer} from "mobx-react-lite";
import SEO from "../../../application/appLayout/SEO";
import emailIcon from "../../../assets/svg-icons/mail-sent.svg";
import {StringParam, useQueryParam} from "use-query-params";

const AwatingConfirmationMail = () => {
    const [email]  = useQueryParam("email", StringParam);
    return (
        <Box>
            <SEO title="Confirm your email" />
            <Box className="container">
                <Center height="87vh">
                <Center p="2em" className="auth__signup">
                    <Stack direction={["column", "row"]} spacing="2em" alignItems="center">
                    <Image src={emailIcon} alt="email" maxWidth="200px" />
                    <Box>
                    <h1 className="text__lg">Confirm your email</h1>
                        <p>An email with a verification link has been sent to <b>{email}</b> for your account to be verified.</p>
                        <p>If you did not recieve the email, then please try again!</p>
                    </Box>
                    </Stack>
                </Center>
                </Center>
            </Box>
        </Box>
    )
}

export default observer(AwatingConfirmationMail);