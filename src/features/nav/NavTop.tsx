import {Box, Flex, Spacer, Image, Divider, Link} from "@chakra-ui/react";
import React from "react";
import Logo from "../../assets/images/taskr-logo.svg";
import NavSearchInput from "./NavSearchInput";
import {EmailIcon} from "../../infrastructure/icons/Icons";
import {useMediaQuery} from "react-responsive";

const NavTop = () => {
    const isSmallScreen = useMediaQuery({query: "(max-width: 1224px)"});
    const isMobile = useMediaQuery({query: "(max-width: 600px)"});
    return (
        <div style={{paddingTop: "1em"}}>
       <Flex alignItems="center" className="navbar__flex__top">
           <Box>
           <Image className="navbar__logo" src={Logo} alt="taskr-logo"/>
           </Box>
           {isSmallScreen && <Spacer />}
         <NavSearchInput />
           <Spacer />
           <div style={!isSmallScreen ? {width: "30%"} : {}}>
           <Flex alignItems="center" justifyContent="space-between">
               {!isMobile && <Link className="text__primary" mr={4} href="#"><EmailIcon /> Contact</Link>}
               <Flex alignItems="center">
               <Link className="text__primary" mr={3} href="#">Login</Link>
                   <Divider mr={3} orientation="vertical" size="lg"/>
               <Link mr={4} className="text__primary" href="#">Signup</Link>
               </Flex>
               <button className="btn btn__primary btn__shadow btn__bold">Post a task</button>
           </Flex>
           </div>
       </Flex>
        </div>
    )
}

export default NavTop;