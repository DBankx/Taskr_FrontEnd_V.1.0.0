import React from "react";
import {observer} from "mobx-react-lite";
import SEO from "../../../application/appLayout/SEO";
import {Box, Button,Divider,Flex, Image} from "@chakra-ui/react";
import Logo from "../../../assets/images/taskr-logo.svg";
import {FacebookIcon, GoogleIcon} from "../../../infrastructure/icons/Icons";
import Separator from "../../../application/common/Separator";
import SignInForm from "./SignInForm";
import {Link} from "react-router-dom";

const SignInPage = () => {
    return (
        <div>
           <SEO title="Sign In" /> 
           <div className="container">
           <Flex style={{padding: "1em"}} alignItems="center">
               <Link to="/">
               <Image src={Logo} alt="taskr-logo" className="navbar__logo" />
               </Link>
           </Flex>
          <Box>
              <div className="auth__card">
                  <div style={{padding: "1em"}}>
                  <h3 className="text__primary">Sign in to taskr.</h3>
                  <div className="auth__providers">
                      <Button className="btn btn__full-width btn__fb btn__auth" leftIcon={<FacebookIcon />}>Continue with Facebook</Button>
                      <Button className="btn btn__full-width btn__outline__auth btn__auth" leftIcon={<GoogleIcon />}>
                          Continue with Google
                      </Button>
                  </div>
                  <Separator content="OR" />
                  <div>
                      <SignInForm />
                  </div>
                  </div>
                  <div className="text__middle">
                      <small className="text__silent">By continuing, you agree to Taskr&apos;s <span className="text__blue">Terms of Service</span> and <span className="text__blue">Privacy policy</span>.</small>
                  </div>
                  <Divider />
                  <div style={{padding: "1em", textAlign: "center"}} className="text__darker">
                      Not registered yet? <Link to="/signup" className="text__blue">Join now</Link>
                  </div>
              </div>
          </Box>
           </div>
        </div>
    )
}

export default observer(SignInPage);