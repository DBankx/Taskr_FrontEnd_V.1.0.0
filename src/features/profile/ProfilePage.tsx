﻿import React from "react";
import {observer} from "mobx-react-lite";
import {TabList, Tabs, Tab,  TabPanel, TabPanels } from "@chakra-ui/react";
import Slider from "react-slick";
import TaskTab from "./myTasks/TaskTab";
import {ChevronLeftIcon, ChevronRightIcon} from "../../infrastructure/icons/Icons";
import MyProfile from "./myProfile/MyProfile";

const ProfilePage = () => {
    function NextArrow(props: any) {
        const { onClick } = props;
        return (
               <ChevronRightIcon className="profile__tabs__next__arr" onClick={onClick} boxSize={7} color="#A0AEC0" />
        );
    }

    function PrevArrow(props: any) {
        const { onClick } = props;
        return (
                <ChevronLeftIcon className="profile__tabs__prev__arr" onClick={onClick} boxSize={7} color="#A0AEC0" />
        );
    }

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow:  5,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: true,
        slidesPerRow: 1,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 500,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    infinite: false,
                    arrows: true
                }
            },
            {
                breakpoint: 900,
                settings:{
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    arrows: true
                }
            }
        ]
    }
    return (
        <div>
           <Tabs isLazy>
             <TabList className="profile__tabs">
                 <Slider {...sliderSettings}>
                 <Tab>My Tasks</Tab>
                 <Tab>My Services</Tab>
                 <Tab>Bids / Offers</Tab>
                 <Tab>My Orders</Tab>
                 <Tab>Watchlist</Tab>
                 <Tab>Saved Runners</Tab>
                 <Tab>My Profile</Tab>
                 <Tab>My Reviews</Tab>
                 <Tab>Account Settings</Tab>
                 </Slider>
             </TabList>  
               
               <TabPanels>
                   <TabPanel>
                       <TaskTab />
                   </TabPanel>
                   <TabPanel>
                       hey
                   </TabPanel>
                   <TabPanel>
                       hey
                   </TabPanel>
                   <TabPanel>
                       hey
                   </TabPanel>
                   <TabPanel>
                       hey
                   </TabPanel>
                   <TabPanel>
                       hey
                   </TabPanel>
                   <TabPanel>
                       <MyProfile />
                   </TabPanel>
               </TabPanels>
           </Tabs> 
        </div>
    )
}


export default observer(ProfilePage);