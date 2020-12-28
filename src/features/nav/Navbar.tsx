import { Box } from "@chakra-ui/react";
import React from "react";
import NavTop from "./NavTop";
import NavBottom from "./NavBottom";

const Navbar = () => {
    return (
        <Box className="navbar__container" w="100%">
            <div className="container">
                <NavTop />
                <NavBottom />
            </div>
        </Box>
    )
}

export default Navbar;