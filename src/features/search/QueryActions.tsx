import {Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import {ChevronDownIcon} from "../../infrastructure/icons/Icons";
import PriceQueryForm from "./PriceQueryForm";
import Slider from "react-slick";
import {observer} from "mobx-react-lite";

const QueryActions = () => {
    const sliderSettings = {
        dots: false,
        adaptiveHeight: true,
        infinite: false,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: true,
        slidesPerRow: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 600,
                settings:{
                    slidesToScroll: 2,
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1224,
                settings:{
                    slidesToScroll: 3,
                    slidesToShow: 4
                }
            }
        ]
    }
    return (
        <div className="query__action__container">
        <Slider {...sliderSettings}>
            <div className="query__action">
                <Menu isLazy={true} >
                    <MenuButton className="menu__btn__outlined" as={Button} rightIcon={<ChevronDownIcon />}>
                        Category
                    </MenuButton>
                    <MenuList className="menu__list">
                        <MenuItem className="menu__item">Download</MenuItem>
                        <MenuItem>Create a Copy</MenuItem>
                        <MenuItem>Mark as Draft</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Attend a Workshop</MenuItem>
                    </MenuList> 
                </Menu>
            </div>
            <div className="query__action">
                <Menu isLazy={true} closeOnSelect={false}>
                    <MenuButton className="menu__btn__outlined" as={Button} rightIcon={<ChevronDownIcon />}>
                        Taskers Budget
                    </MenuButton>
                    <MenuList>
                        <PriceQueryForm />
                    </MenuList>
                </Menu>
            </div>
            <div className="query__action">
                <Menu isLazy={true}>
                    <MenuButton className="menu__btn__outlined" as={Button} rightIcon={<ChevronDownIcon />}>
                        Offer Type
                    </MenuButton>
                    <MenuList>
                       <MenuItem>Bid</MenuItem>
                        <MenuItem>Non negotiable</MenuItem>
                        <MenuItem>Both</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className="query__action">
                <Menu isLazy={true}>
                    <MenuButton className="menu__btn__outlined" as={Button} rightIcon={<ChevronDownIcon />}>
                       Delivery Time 
                    </MenuButton>
                    <MenuList>
                        <MenuItem>ASAP</MenuItem>
                        <MenuItem>Up to 3 days</MenuItem>
                        <MenuItem>Up to 7 days</MenuItem>
                        <MenuItem>Anytime</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className="query__action">
                <Menu isLazy={true}>
                    <MenuButton className="menu__btn__outlined" as={Button} rightIcon={<ChevronDownIcon />}>
                       Sort by 
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Posted: Oldest first</MenuItem>
                        <MenuItem>Posted: Newest first</MenuItem>
                        <MenuItem>Price: Lowest first</MenuItem>
                        <MenuItem>Price: Highest first</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Slider>
        </div>
    )
}

export default observer(QueryActions);