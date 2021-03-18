import React from "react";
import { Box} from "@chakra-ui/react";
import Slider from "react-slick";
import { observer } from "mobx-react-lite";
import {Link} from "react-router-dom";

const NavBottom = () => {
    
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow:  9,
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
                    <Link className="text__primary link"  to="/">Home</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary link"  to="/tasks">All tasks</Link>
                </div >
                <div className="navbar__list_bottom">
                    <Link className="text__primary link"  to="/tasks?category=5">Errands</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary link"  to="/tasks?category=6">Delivery</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary link"  to="/tasks?category=4">Digital</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary link"  to="/tasks?category=2">Laundry</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary link"  to="/tasks?category=0">Cleaning</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary link"  to="/tasks?category=3">Groceries</Link>
                </div>
                <div className="navbar__list_bottom">
                    <Link className="text__primary link"  to="/tasks?category=1">Catering</Link>
                </div>
            </Slider>
        </Box>
    )
}

export default observer(NavBottom);