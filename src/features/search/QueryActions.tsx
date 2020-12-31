import {Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import {ChevronDownIcon} from "../../infrastructure/icons/Icons";
import PriceQueryForm from "./PriceQueryForm";
import {useMediaQuery} from "react-responsive";
import Slider from "react-slick";
import {observer} from "mobx-react-lite";

const QueryActions = () => {
    const isMobile = useMediaQuery({query: "(max-width: 600px)"});
    const isTablet = useMediaQuery({query: "(max-width: 1224px)"});
    const sliderSettings = {
        dots: false,
        adaptiveHeight: true,
        infinite: false,
        speed: 500,
        slidesToShow: isMobile ? 2 : isTablet ? 4 : 10,
        slidesToScroll: isMobile ? 2 : isTablet ? 3 :  1,
        arrows: false,
        variableWidth: true,
        slidesPerRow: 1
    }
    return (
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
    )
}

export default observer(QueryActions);