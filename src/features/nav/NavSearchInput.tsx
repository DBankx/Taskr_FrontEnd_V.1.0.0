import {IconButton, InputGroup, InputLeftElement, Input} from "@chakra-ui/react";
import React from "react";
import {LocationIcon, SearchIcon} from "../../infrastructure/icons/Icons";

const NavSearchInput = () => {
    return (
       <form className="navbar__search">
           <input placeholder="Find services..." className="navbar__search__input search__main" />
           <InputGroup className="navbar__input__group">
               <InputLeftElement className="navbar__input__group__right">
                  <LocationIcon boxSize={8} /> 
               </InputLeftElement>
           <Input placeholder="Location" className="navbar__search__input search__location" />
           </InputGroup>
           <IconButton className="navbar__search__button" aria-label="Search anything..." icon={<SearchIcon boxSize={8} />} />
       </form> 
    )
}

export default NavSearchInput;