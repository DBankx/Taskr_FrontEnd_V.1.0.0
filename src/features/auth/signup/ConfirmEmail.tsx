import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Box, Center, Stack} from "@chakra-ui/react";
import SEO from "../../../application/appLayout/SEO";
import {CheckmarkIcon} from "../../../infrastructure/icons/Icons";
import {Link} from "react-router-dom";
import rootStoreContext from "../../../application/stores/rootstore";
import {StringParam, useQueryParams} from "use-query-params";
import Loader from "../../../application/appLayout/FullPageSpinner";

const ConfirmEmail = () => {
    const {confirmEmail, confirmingEmail} = useContext(rootStoreContext).authStore;
    const [confirmEmailParams] = useQueryParams({
        userId: StringParam,
        code: StringParam
    });
    useEffect(() => {
        confirmEmail(confirmEmailParams.userId!, confirmEmailParams.code!);
    }, [confirmEmailParams]);
    
    if(confirmingEmail) return <Loader />
    
    return (
        <Box>
           <SEO title="Confirm your email" /> 
           <Box className="container">
               <Center height="87vh">
                   <Center p="2em" className="auth__signup">
                       <Stack direction={["column", "row"]} spacing="2em" alignItems="center">
                           <CheckmarkIcon color="#37a864" boxSize="150px" maxWidth="200px" />
                           <Box>
                               <h1 className="text__lg">Congratulations your email has been confirmed</h1>
                               <p>Your email has been confirmed!, your new taskr account has no limits!</p>
                               <Link to="/signin" style={{display: "block"}} className="link text__blue">Sign In &#8594;</Link>
                           </Box>
                       </Stack>
                   </Center>
               </Center>
           </Box>
        </Box>
    )
}

export default observer(ConfirmEmail);