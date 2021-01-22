import React from "react";
import {observer} from "mobx-react-lite";
import {TabList, Tabs, Tab,  TabPanel, TabPanels } from "@chakra-ui/react";
// import Slider from "react-slick";
import TaskTab from "./myTasks/TaskTab";

const ProfilePage = () => {
    // const sliderSettings = {
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow:  5,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     variableWidth: true,
    //     slidesPerRow: 1,
    //     initialSlide: 0,
    //     responsive: [
    //         {
    //             breakpoint: 500,
    //             settings:{
    //                 slidesToShow: 3,
    //                 slidesToScroll: 3,
    //                 infinite: false,
    //             }
    //         },
    //         {
    //             breakpoint: 900,
    //             settings:{
    //                 slidesToShow: 4,
    //                 slidesToScroll: 1,
    //                 infinite: false
    //             }
    //         }
    //     ]
    // }
    return (
        <div>
           <Tabs index={0} isLazy>
             <TabList className="profile__tabs">
                 <Tab>My Tasks</Tab>
                 <Tab>My Services</Tab>
                 <Tab>Bids / Offers</Tab>
                 <Tab>My Orders</Tab>
                 <Tab>Watchlist</Tab>
                 <Tab>Saved Runners</Tab>
                 <Tab>My Profile</Tab>
                 <Tab>My Reviews</Tab>
                 <Tab>Account Settings</Tab>
             </TabList>  
               
               <TabPanels>
                   <TabPanel>
                       <TaskTab />
                   </TabPanel>
               </TabPanels>
           </Tabs> 
        </div>
    )
}


export default observer(ProfilePage);