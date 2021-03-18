import {Image,  useMediaQuery, HStack, Button} from "@chakra-ui/react";
import React, {useContext, lazy, Suspense} from "react";
import Logo from "../../assets/images/taskr-logo.svg";
import NavSearchInput from "./NavSearchInput";
import {WebIcon} from "../../infrastructure/icons/Icons";
import {useLocation, Link} from "react-router-dom";
import rootStoreContext from "../../application/stores/rootstore";
import {observer} from "mobx-react-lite";
import InlineLoader from "../../application/appLayout/InlineLoader";
import {history} from "../../index";

const AuthNavItems = lazy(() => import("./navAuth/AuthNavItems"))

const NavTop = () => {
    const [isSmallScreen] = useMediaQuery("(max-width: 1349px)");
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    const location = useLocation();
    const {isLoggedIn, user} = useContext(rootStoreContext).authStore;
    console.log(isSmallScreen);
    return (
        <div style={{padding: location.pathname === "/" ? "1em 0 0 0" : "1em 0" }}>
       <HStack justifyContent={"space-between"} alignItems="center" className="navbar__flex__top">
           <Link to="/">
           <Image className="navbar__logo" src={Logo} alt="taskr-logo"/>
           </Link>
         <NavSearchInput />
           {isLoggedIn && user ? 
               <Suspense fallback={<InlineLoader />}>
                   <AuthNavItems user={user} />
               </Suspense>
               : <div>
                   <HStack spacing="20px" justifyContent="space-between">
                       {!isMobile && <Link className="text__bold text__primary link" to="/task"><WebIcon boxSize={6} /> English</Link>}
                       {!isMobile && <Link className="text__bold text__primary link" to="/task">Become a Runner</Link>}
                       <Link className="text__bold text__primary link" to="/signin">Login</Link>
                        <Button className="btn btn__primary" onClick={() => history.push("/signup")} >Sign Up</Button>
                   </HStack>
           </div>
           }
       </HStack>
        </div>
    )
}

export default React.memo(observer(NavTop));