import { Box } from "@chakra-ui/react";
import React from "react";
import NavTop from "./NavTop";
import NavBottom from "./NavBottom";
import { useLocation } from "react-router-dom";
import {observer} from "mobx-react-lite";

const Navbar = () => {
    const location = useLocation();
    return (
        <Box className="navbar__container" w="100%">
            <div className="container">
                <NavTop />
                {location.pathname === "/" && <NavBottom />}
            </div>
        </Box>
    )
}

export default observer(Navbar);