import {Box, Flex, Spacer, Image, Divider} from "@chakra-ui/react";
import React from "react";
import Logo from "../../assets/images/taskr-logo.svg";
import NavSearchInput from "./NavSearchInput";
import {EmailIcon} from "../../infrastructure/icons/Icons";
import {useMediaQuery} from "react-responsive";
import {useLocation, Link} from "react-router-dom";

const NavTop = () => {
    const isSmallScreen = useMediaQuery({query: "(max-width: 1224px)"});
    const isMobile = useMediaQuery({query: "(max-width: 600px)"});
    const location = useLocation();
    return (
        <div style={{padding: location.pathname === "/" ? "1em 0 0 0" : "1em 0" }}>
       <Flex alignItems="center" className="navbar__flex__top">
           <Box>
           <Image className="navbar__logo" src={Logo} alt="taskr-logo"/>
           </Box>
           {isSmallScreen && <Spacer />}
         <NavSearchInput />
           <Spacer />
           <div style={!isSmallScreen ? {width: "30%"} : {}}>
           <Flex alignItems="center" justifyContent="space-between">
               {!isMobile && <Link className="text__primary" to="/contact" style={{marginRight: "1em"}} href="#"><EmailIcon /> Contact</Link>}
               <Flex alignItems="center">
                    <Link className="text__primary" to="/signin" style={{marginRight: "1em"}}>Login</Link>
                   {!isMobile && <Divider mr={3} orientation="vertical" size="lg"/> }
                   {!isMobile &&<Link to="/signup" style={{marginRight: "1em"}} className="text__primary" href="#">Signup</Link>}
               </Flex>
               <button className="btn btn__primary btn__shadow btn__bold">Post a task</button>
           </Flex>
           </div>
       </Flex>
        </div>
    )
}

export default NavTop;