import {Button, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Portal } from "@chakra-ui/react";
import React, {Fragment} from "react";
import {ChevronDownIcon} from "../../infrastructure/icons/Icons";
import PriceQueryForm from "./PriceQueryForm";
import Slider from "react-slick";
import {observer} from "mobx-react-lite";
import {NumberParam, StringParam, useQueryParams} from "use-query-params";
import {getAllEnumKeys} from "../../infrastructure/enums/enumFunctions";
import {Category} from "../../infrastructure/enums/category";
import {DeliveryTypes} from "../../infrastructure/enums/deliveryTypes";

const QueryActions = () => {
    const [queryParams, setParams] = useQueryParams({
        title: StringParam,
        deliveryType: NumberParam,
        category: NumberParam,
        sortBy: StringParam,
        minPrice: NumberParam,
        maxPrice: NumberParam
    })
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
                        {getAllEnumKeys(Category).map((category: string, i) => (
                            <MenuItem key={i} onClick={() => setParams({...queryParams, category: i})}>{category}</MenuItem>
                        ))} 
                    </MenuList> 
                </Menu>
            </div>
            <div className="query__action">
                <Popover isLazy variant="responsive">
                    {({onClose}) => (
                        <Fragment>
                    <PopoverTrigger>
                        <Button className="menu__btn__outlined" rightIcon={<ChevronDownIcon />}>Taskr&apos;s budget</Button>
                    </PopoverTrigger>
                    <Portal>
                    <PopoverContent boxShadow="lg">
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Budget range</PopoverHeader>
                        <PopoverBody p={0}><PriceQueryForm onClose={onClose} /></PopoverBody>
                    </PopoverContent>
                    </Portal>
                        </Fragment>
                        )}
                </Popover>
            </div>
            <div className="query__action">
                <Menu isLazy={true}>
                    <MenuButton className="menu__btn__outlined" as={Button} rightIcon={<ChevronDownIcon />}>
                       Sort by 
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setParams({...queryParams, sortBy: "OLDEST"})}>Posted: Oldest first</MenuItem>
                        <MenuItem onClick={() => setParams({...queryParams, sortBy: "NEWEST"})}>Posted: Newest first</MenuItem>
                        <MenuItem onClick={() => setParams({...queryParams, sortBy: "LOWEST"})}>Price: Lowest first</MenuItem>
                        <MenuItem onClick={() => setParams({...queryParams, sortBy: "HIGHEST"})}>Price: Highest first</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className="query__action">
                <Menu isLazy={true}>
                    <MenuButton className="menu__btn__outlined" as={Button} rightIcon={<ChevronDownIcon />}>
                        Delivery type
                    </MenuButton>
                    <MenuList>
                        {getAllEnumKeys(DeliveryTypes).map((deliveryType: string, i) => (
                            <MenuItem key={i} onClick={() => setParams({...queryParams, deliveryType: i})}>{deliveryType}</MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </div>
        </Slider>
        </div>
    )
}

export default React.memo(observer(QueryActions));