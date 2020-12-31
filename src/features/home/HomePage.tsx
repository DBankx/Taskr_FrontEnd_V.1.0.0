import { Box} from "@chakra-ui/react";
import React from "react";
import {useMediaQuery} from "react-responsive";
import {RightArrowIcon} from "../../infrastructure/icons/Icons";

const HomePage = () => {
    const isMobile = useMediaQuery({query: "(max-width: 400px)"});
    return (
        <div>
            <Box className="home__banner">
                <div className="container">
                    <div className="home__banner__container">
               <h1 className="home__banner__text">The {isMobile ? "No 1": "number one"} online marketplace for delegating <i style={{fontWeight: "initial"}}>tasks</i></h1>
                        <div className={isMobile ? "" : "flexer"}>
                            <button className={isMobile ? "btn btn__accent btn__shadow btn__bg btn__full-width" : "btn btn__primary btn__shadow btn__bg "}>Become a runner</button>
                            <p className="home__banner__learn">Learn more <RightArrowIcon boxSize={8} /></p>
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default HomePage;