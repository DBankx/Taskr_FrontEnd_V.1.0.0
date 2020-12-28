import React from "react";
import { Box, Link } from "@chakra-ui/react";
import Slider from "react-slick";
import {useMediaQuery} from "react-responsive"; 

const NavBottom = () => {
    const isMobile = useMediaQuery({query: "(max-width: 500px)"});
    
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: isMobile ? 5 : 10,
        slidesToScroll: isMobile ? 3 : 1,
        arrows: false
    }
    
    return (
        <Box style={{padding: "1em 0"}}>
            <Slider {...settings}>
               <div style={{whiteSpace: "nowrap"}}>
                   <Link className="text__primary" href="#">All tasks</Link>
               </div> 
                <div>
                    <Link className="text__primary" href="#">Home</Link>
                </div>
                <div>
                    <Link className="text__primary" href="#">Errands</Link>
                </div>
                <div>
                    <Link className="text__primary" href="#">Projects</Link>
                </div>
                <div>
                    <Link className="text__primary" href="#">Digital</Link>
                </div>
                <div>
                    <Link className="text__primary" href="#">Laundry</Link>
                </div>
                <div>
                    <Link className="text__primary" href="#">Feeding</Link>
                </div>
                <div>
                    <Link className="text__primary" href="#">Groceries</Link>
                </div>
                <div>
                    <Link className="text__primary" href="#">Work</Link>
                </div>
                <div>
                    <Link className="text__primary" href="#">Life</Link>
                </div>
            </Slider>
           {/*<ul className="flexer">*/}
           {/*    <li className="navbar__list_bottom"></li>*/}
           {/*    <li className="navbar__list_bottom"></li>*/}
           {/*    <li className="navbar__list_bottom"></li>*/}
           {/*    <li className="navbar__list_bottom"></li>*/}
           {/*    <li className="navbar__list_bottom"></li>*/}
           {/*    <li className="navbar__list_bottom"></li>*/}
           {/*    <li className="navbar__list_bottom"></li>*/}
           {/*</ul> */}
        </Box>
    )
}

export default NavBottom;