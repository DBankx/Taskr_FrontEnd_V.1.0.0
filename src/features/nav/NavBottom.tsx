import React from "react";
import { Box, Link } from "@chakra-ui/react";
import Slider from "react-slick";
import { observer } from "mobx-react-lite";

const NavBottom = () => {
    
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow:  10,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: true,
        slidesPerRow: 1,
        adaptiveHeight: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 500,
                settings:{
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                }
            }
        ]
    }
    
    return (
        <Box style={{padding: "1em 0"}}>
            <Slider {...settings}>
               <div className="navbar__list_bottom">
                   <Link className="text__primary" href="#">All tasks</Link>
               </div > 
                <div className="navbar__list_bottom">
                    <Link className="text__primary" href="#">Home</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary" href="#">Errands</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary" href="#">Projects</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary" href="#">Digital</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary" href="#">Laundry</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary" href="#">Feeding</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary" href="#">Groceries</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary" href="#">Work</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary" href="#">Life</Link>
                </div>
            </Slider>
        </Box>
    )
}

export default observer(NavBottom);