import { Box, SimpleGrid, Circle, Center, Stack, Image, Tabs, TabList, TabPanels, TabPanel, Tab} from "@chakra-ui/react";
import React from "react";
import Logo from "../../assets/images/taskr-logo.svg";
import postOnline from "../../assets/images/undraw_Post_online_re_1b82.svg";
import reviewOffers from "../../assets/images/undraw_Hiring_re_yk5n.svg";
import pay from "../../assets/images/undraw_Credit_card_re_blml.svg";
import {useMediaQuery} from "@chakra-ui/react";
import {
    CateringIcon, CheckmarkIcon,
    CleaningIcon,
    DeliverIcon,
    ErrandsIcon, GroceriesIcon,
    LaundryIcon, PlusIcon,
    RightArrowIcon, WebIcon
} from "../../infrastructure/icons/Icons";
import {Link} from "react-router-dom";
import Rater from "../../application/common/Rater";

const HomePage = () => {
    const [isMobile] = useMediaQuery("(max-width: 400px)");
    return (
        <Box pb="2em" style={{backgroundColor: "#fff"}}>
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
            
            <Box className="container">
                <Box mt="4em" mb="4em">
                <h2 style={{fontSize: "24px", lineHeight: "32px", fontWeight: 600}}>What do you need done?</h2>
                    <SimpleGrid mt="1em" mb="1em" spacing="10px" templateColumns={{lg: "repeat(7, 1fr)", md: "repeat(5, 1fr)", sm: "repeat(4, 1fr)", base: "repeat(4, 1fr)"}}>
                        <Box>
                            <Center>
                        <Link to="/create-task/details"><Circle bg="#373373" color="#fff" size={{lg: "100px", md: "100px", sm: "64px", base: "64px"}}>
                          <ErrandsIcon boxSize="32px" />  
                        </Circle></Link>
                            </Center>
                            <Box>
                            <Center><p className="text__middle">Running Errands</p></Center>
                            </Box>
                        </Box>

                        <Box>
                            <Center>
                                <Link to="/create-task/details"><Circle bg="#373373" color="#fff" size={{lg: "100px", md: "100px", sm: "64px", base: "64px"}}>
                                    <CleaningIcon boxSize="32px" />
                                </Circle></Link>
                            </Center>
                            <Box>
                                <Center><p className="text__middle">Home Cleaning</p></Center>
                            </Box>
                        </Box>

                        <Box>
                            <Center>
                                <Link to="/create-task/details"><Circle bg="#373373" color="#fff" size={{lg: "100px", md: "100px", sm: "64px", base: "64px"}}>
                                    <LaundryIcon boxSize="32px" />
                                </Circle></Link>
                            </Center>
                            <Box>
                                <Center><p className="text__middle">Personal Laundry</p></Center>
                            </Box>
                        </Box>

                        <Box>
                            <Center>
                                <Link to="/create-task/details"><Circle bg="#373373" color="#fff" size={{lg: "100px", md: "100px", sm: "64px", base: "64px"}}>
                                    <DeliverIcon boxSize="32px" />
                                </Circle></Link>
                            </Center>
                            <Box>
                                <Center><p className="text__middle">Items Delivery</p></Center>
                            </Box>
                        </Box>

                        <Box>
                            <Center>
                                <Link to="/create-task/details"><Circle bg="#373373" color="#fff" size={{lg: "100px", md: "100px", sm: "64px", base: "64px"}}>
                                    <CateringIcon boxSize="32px" />
                                </Circle></Link>
                            </Center>
                            <Box>
                                <Center><p className="text__middle">Catering</p></Center>
                            </Box>
                        </Box>

                        <Box>
                            <Center>
                                <Link to="/create-task/details"><Circle bg="#373373" color="#fff" size={{lg: "100px", md: "100px", sm: "64px", base: "64px"}}>
                                    <GroceriesIcon boxSize="32px" />
                                </Circle></Link>
                            </Center>
                            <Box>
                                <Center><p className="text__middle">Grocery Shopping</p></Center>
                            </Box>
                        </Box>

                        <Box>
                            <Center>
                                <Link to="/create-task/details"><Circle bg="#373373" color="#fff" size={{lg: "100px", md: "100px", sm: "64px", base: "64px"}}>
                                    <WebIcon boxSize="32px" />
                                </Circle></Link>
                            </Center>
                            <Box>
                                <Center><p className="text__middle">Tech problems</p></Center>
                            </Box>
                        </Box>
                    </SimpleGrid>
                </Box>
                
                <Box mt="2em">
                    <Center>
                        <Box>
                    <Stack spacing="10px" direction="row" alignItems="center">
                        <Image src={Logo} alt="taskr" width="100px" />
                        <PlusIcon boxSize="20px" color="#AEBBC6" />
                        <Image src={"https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Stripe_logo%2C_revised_2016.png/1200px-Stripe_logo%2C_revised_2016.png"} alt="stripe" width="100px" />
                    </Stack>
                            <Center><a className="link text__bold text__middle" href="https://stripe.com/payments" rel="noreferrer noopener" target="_blank">Learn more &#8594;</a></Center>
                        </Box>
                    </Center>
                </Box>
            </Box>
            
            <Box className="container" mt="4em">
                <Center>
                    <Box width={{lg: "50%", md: "70%", base: "100%"}} className="text__middle">
                        <h1 style={{fontSize: "24px", lineHeight: "32px", fontWeight: 600, marginBottom: "0.5em"}}>How does taskr work?</h1>
                        <p className="text__md">Having a task up and running on our platform is very easy and simple and all you need to do is follow these steps</p>
                    </Box>
                    
                </Center>
                
                <SimpleGrid mt="2em" templateColumns={{lg: "repeat(4, 1fr)", md: "repeat(3, 1fr)", sm: "1fr"}} spacing="10px">
                    <Box mb="1em" className="text__middle">
                        <Center>
                            <Image src={postOnline} width="100px" />
                        </Center>
                        <Box>
                        <b>Post your task</b>
                            <p>Tell us what you need to be done and how much your budget is</p>
                        </Box>
                    </Box>

                    <Box mb="1em" className="text__middle">
                        <Center>
                            <Image src={reviewOffers} width="198px" />
                        </Center>
                        <Box>
                            <b>View and accept bids</b>
                            <p>Get bids from trusted runners and view their profiles</p>
                        </Box>
                    </Box>

                    <Box mb="1em" className="text__middle">
                        <Center>
                            <Image src={pay} width="198px" />
                        </Center>
                        <Box>
                            <b>Pay a bid</b>
                            <p>Place payment on a runner&apos;s bid you like and get the task started</p>
                        </Box>
                    </Box>

                    <Box mb="1em" className="text__middle">
                        <Center>
                            <CheckmarkIcon boxSize="180px" color="#373373" />
                        </Center>
                        <Box>
                            <b>Complete your task</b>
                            <p>Finish your task and release payment to runner and leave a review!</p>
                        </Box>
                    </Box>
                </SimpleGrid>
                <Center mt="1em"><Link className="btn btn__primary btn__nm btn__bg" to="/create-task/details">Get Started Now &#8594;</Link></Center>
            </Box>
            
            <Box mt="4em" style={{backgroundColor: "#F8F9F9"}}>
                <Box className="container">
                <Center>
               <Box width={{lg: "50%", md: "70%", base: "100%"}} className="text__middle" pt="3em">
                   <h1 style={{fontSize: "24px", lineHeight: "32px", fontWeight: 600, marginBottom: "0.5em"}}>Meet some Runners!</h1>
                   <p className="text__md">Discover the story behind the people that are making the Airtasker community great, how and why they do what they do.</p>
               </Box>
                </Center>

                    <Center mt="1.5em">
                <Tabs isLazy>
                    <TabList style={{margin: "0 auto 1em auto"}} className="home__tab">
                        <Tab>Mustapha</Tab>
                        <Tab>Esther</Tab>
                        <Tab>Gordonisha</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Box bg="#fff" maxW="800px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                                <Stack direction={["column", "row"]}>
                                    <Image src="https://images.unsplash.com/photo-1521312706689-fbd93fd5af46?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1026&q=80" width={{lg: "50%", md: "50%", base: "initial"}} alt="james" />
                                    <Box p="5">
                                        <Box className="text__primary text__bold text__bigger__md" as="h1">Mustapha</Box>
                                        <i className="text__silent">Niche: software development, coding, web design</i>
                                        
                                        <Box className="text__dark__grey" mt="0.5em" lineHeight="1.2em">A part time developer and student looking for a means to support him and boost his income, he had to find something that could be flexible and cover the cost of tuition.</Box>
                                        
                                        <Box mt="1em">
                                            <Box mb="1em">
                                            <Box pb="0.5em" className="text__primary text__bold text__sm">Rating</Box>
                                            
                                            <Box>
                                              <Rater boxSize={5} rating={5} justifyContent="flex-start" />  
                                              <p className="text__silent">5 stars from 165 reviews</p>
                                            </Box>
                                                
                                                <Link to="/become-runner" className="link text__blue">Learn more</Link>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box bg="#fff" maxW="800px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                                <Stack direction={["column", "row"]}>
                                    <Image src="https://images.unsplash.com/photo-1593804863197-0a95c8ebef64?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" width={{lg: "50%", md: "50%", base: "initial"}} height="100%" alt="james" />
                                    <Box p="5">
                                        <Box className="text__primary text__bold text__bigger__md" as="h1">Esther</Box>
                                        <i className="text__silent">Niche: cooking, catering, food technique</i>

                                        <Box className="text__dark__grey" mt="0.5em" lineHeight="1.2em">A full time cook looking for a platform to help people in need of good food anytime all the time.</Box>

                                        <Box mt="1em">
                                            <Box mb="1em">
                                                <Box pb="0.5em" className="text__primary text__bold text__sm">Rating</Box>

                                                <Box>
                                                    <Rater boxSize={5} rating={4} justifyContent="flex-start" />
                                                    <p className="text__silent">4.3 stars from 1K+ reviews</p>
                                                </Box>

                                                <Link to="/become-runner" className="link text__blue">Learn more</Link>
                                            </Box>
                                            </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box bg="#fff" maxW="800px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                                <Stack direction={["column", "row"]}>
                                    <Image src="https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" width={{lg: "50%", md: "50%", base: "initial"}} height="100%" alt="james" />
                                    <Box p="5">
                                        <Box className="text__primary text__bold text__bigger__md" as="h1">Gordonisha</Box>
                                        <i className="text__silent">Niche: art, web design, painting</i>

                                        <Box className="text__dark__grey" mt="0.5em" lineHeight="1.2em">A motivated artist looking for a way to increase her income from her work.</Box>

                                        <Box mt="1em">
                                            <Box mb="1em">
                                                <Box pb="0.5em" className="text__primary text__bold text__sm">Rating</Box>

                                                <Box>
                                                    <Rater boxSize={5} rating={5} justifyContent="flex-start" />
                                                    <p className="text__silent">5 stars from 322 reviews</p>
                                                </Box>

                                                <Link to="/become-runner" className="link text__blue">Learn more</Link>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                    </Center>
                    <Center mt="1em"><Link to="/become-runner" className="btn btn__primary btn__nm btn__bg">Become a Runner</Link></Center>
                </Box>
            </Box>
            
        </Box>
    )
}

export default HomePage;

