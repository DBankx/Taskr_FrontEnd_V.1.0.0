import {Box, Button, Divider, Flex, Image, Center, HStack, Circle, SimpleGrid} from "@chakra-ui/react";
import React from "react";
import SEO from "../../../application/appLayout/SEO";
import {Link} from "react-router-dom";
import Logo from "../../../assets/images/taskr-logo.svg";
import SignUpForm from "./SignUpForm";
import {CheckmarkIcon, FacebookIcon, GoogleIcon} from "../../../infrastructure/icons/Icons";
import Separator from "../../../application/common/Separator";

const SignUpPage = () => {
    return (
        <Box>
           <SEO title="sign Up" />
           <Box className="container">
            <Flex style={{padding: "1em"}} alignItems="center">
                <Link to="/">
                    <Image src={Logo} alt="taskr-logo" className="navbar__logo" />
                </Link>
            </Flex>
               <Center alignItems="flex-start" height="100vh" width="100%">
                   <SimpleGrid templateColumns={{lg: "2fr 1fr", md: "2fr 1fr", sm: "1fr"}} spacing="2em">
            <Box className="auth__signup">
                <div style={{padding: "1em"}}>
                    <Center><h1 className="text__primary text__lg">Join taskr</h1></Center>
                    <div>
                        <SignUpForm />
                    </div>
                    <Separator content="OR" />
                    <div className="auth__providers">
                        <Button className="btn btn__full-width btn__fb btn__auth" leftIcon={<FacebookIcon />}>Continue with Facebook</Button>
                        <Button className="btn btn__full-width btn__outline__auth btn__auth" leftIcon={<GoogleIcon />}>
                            Continue with Google
                        </Button>
                    </div>
                </div>
                <Divider />
                <div style={{padding: "1em", textAlign: "center"}} className="text__darker">
                    Already a member? <Link to="/signin" className="text__blue">Sign in</Link>
                </div>
            </Box>
                       <Box>
                           <Box p="1em" mb="2em" className="auth__signup">
                               <Center mb="0.5em"><h3 className="text__darker text__bigger__md">Already Registered?</h3></Center>
                     <small>Sign in to post a task</small>
                               <Box mt="1em" className="form__field">
                                   <Button type="submit" className="form__action__button btn__full-width btn__primary">Sign in</Button>
                               </Box>
                           </Box>
                           <Box p="1em" lineHeight="1em" className="auth__signup">
                               <Center><h3 className="text__darker text__bigger__md">Why Register</h3></Center>
                               <small style={{marginTop: "1em", display: "block"}} className="text__darker text__bold">To improve your taskr experience and help you stay safe and secure, you now need to register to:</small>
                              <Box mt="1em">
                                  <HStack alignItems="flex-start" mb="0.5em">
                                      <Circle size="20px" bg="#37a864" color="#fff"><CheckmarkIcon boxSize={5} /></Circle>
                                      <small className="text__darker">Post, edit and manage tasks</small>
                                  </HStack>
                                  <HStack alignItems="flex-start" mb="0.5em">
                                      <Circle size="20px" bg="#37a864" color="#fff"><CheckmarkIcon boxSize={5} /></Circle>
                                      <small className="text__darker">Access saved tasks in your watched list from all devices</small>
                                  </HStack>
                                  <HStack alignItems="flex-start" mb="0.5em">
                                      <Circle size="20px" bg="#37a864" color="#fff"><CheckmarkIcon boxSize={5} /></Circle>
                                      <small className="text__darker ">Reserve your own nickname</small>
                                  </HStack>
                                  <HStack alignItems="flex-start">
                                      <Circle size="20px" bg="#37a864" color="#fff"><CheckmarkIcon boxSize={5} /></Circle>
                                      <small className="text__darker">And much more!</small>
                                  </HStack>
                              </Box> 
                           </Box>
                       </Box>
                   </SimpleGrid>
               </Center>
           </Box>
        </Box>
    )
}

export default SignUpPage;