import React from "react";
import { Box, Link } from "@chakra-ui/react";

const NavBottom = () => {
    return (
        <Box style={{padding: "1em 0"}}>
           <ul className="flexer">
               <li className="navbar__list_bottom"><Link className="text__primary" href="#">All Categories</Link></li>
               <li className="navbar__list_bottom"><Link className="text__primary" href="#">Home</Link></li>
               <li className="navbar__list_bottom"><Link className="text__primary" href="#">Errands</Link></li>
               <li className="navbar__list_bottom"><Link className="text__primary" href="#">Projects</Link></li>
               <li className="navbar__list_bottom"><Link className="text__primary" href="#">Work</Link></li>
               <li className="navbar__list_bottom"><Link className="text__primary" href="#">Digital</Link></li>
               <li className="navbar__list_bottom"><Link className="text__primary" href="#">Laundry</Link></li>
           </ul> 
        </Box>
    )
}

export default NavBottom;