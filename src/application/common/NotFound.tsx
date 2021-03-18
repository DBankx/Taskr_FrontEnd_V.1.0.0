import { Center, Box, Image, Button } from "@chakra-ui/react";
import React from "react";
import notFoundSvg from "../../assets/images/undraw_page_not_found_su7k.svg";
import {PreviousIcon} from "../../infrastructure/icons/Icons";
import {history} from "../../index";

const NotFound = () => {
    return (
        <Center height="95vh">
            <Box>
               <Center> <Image src={notFoundSvg} alt="not-found" maxW="600px" width="80%" /></Center>
              <Center mt={5}><h1 className="text__lg">It looks like you&apos;re lost...</h1></Center>
                <Center ><p className="text__md text__darker">The page you are looking for can&apos; be found or no longer exists</p></Center>
                <Center mt={5}><Button onClick={() => history.push("/")} leftIcon={<PreviousIcon color="#fff" />} className="btn btn__nm btn__primary">Go Home</Button></Center>
            </Box>
        </Center>
    )
}

export default NotFound;