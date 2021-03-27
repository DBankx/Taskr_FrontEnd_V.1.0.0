import { Box, Container, SimpleGrid, HStack, Circle, Center } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import {FacebookIcon, GoogleIcon, TwitterIcon} from "../../infrastructure/icons/Icons";

const Footer = () => {
    return (
        <Box>
        <Container maxW="container.lg">
            <SimpleGrid spacing="1.5em" justifyContent="space-between" pt="4em" templateColumns={{lg: "repeat(4, 1fr)", md: "repeat(4, 1fr)", base: "1fr"}}>
              <Box>
                  <h3 className="footer__heading">Discover</h3>
                  <ul className="footer__list">
                      <li><Link to="/tasks" className="link text__silent">View tasks</Link></li>
                      <li><Link to="/" className="link text__silent">Earn money</Link></li>
                      <li><Link to="/" className="link text__silent">For Businesses</Link></li>
                      <li><Link to="/" className="link text__silent">Support FAQ&apos;s</Link></li>
                  </ul>
              </Box>

                <Box>
                    <h3 className="footer__heading">Company</h3>
                    <ul className="footer__list">
                        <li><Link to="/" className="link text__silent">About us</Link></li>
                        <li><Link to="/" className="link text__silent">Careers</Link></li>
                        <li><Link to="/" className="link text__silent">Enquiries</Link></li>
                        <li><Link to="/" className="link text__silent">Blogs</Link></li>
                        <li><Link to="/contact" className="link text__silent">Contact us</Link></li>
                        <li><Link to="/" className="link text__silent">Privacy policy</Link></li>
                        <li><Link to="/" className="link text__silent">Terms of use</Link></li>
                        <li><Link to="/" className="link text__silent">Investors</Link></li>
                    </ul>
                </Box>

                <Box>
                    <h3 className="footer__heading">Members</h3>
                    <ul className="footer__list">
                        <li><Link to="/create-task/details" className="link text__silent">Post a task</Link></li>
                        <li><Link to="/tasks" className="link text__silent">Browse tasks</Link></li>
                        <li><Link to="/signin" className="link text__silent">Login</Link></li>
                        <li><Link to="/" className="link text__silent">Support center</Link></li>
                        <li><Link to="/contact" className="link text__silent">Merchandise</Link></li>
                    </ul>
                </Box>

                <Box>
                    <h3 className="footer__heading">Categories</h3>
                    <ul className="footer__list">
                        <li><Link to="/tasks?category=5" className="link text__silent">Errands</Link></li>
                        <li><Link to="/tasks?category=6" className="link text__silent">Delivery</Link></li>
                        <li><Link to="/tasks?category=4" className="link text__silent">Digital</Link></li>
                        <li><Link to="/tasks?category=2" className="link text__silent">Laundry</Link></li>
                        <li><Link to="/tasks?category=0" className="link text__silent">Cleaning</Link></li>
                        <li><Link to="/tasks?category=3" className="link text__silent">Groceries</Link></li>
                        <li><Link to="/tasks?category=1" className="link text__silent">Catering</Link></li>
                    </ul>
                </Box>
            </SimpleGrid>
            
            <Center mt="3em">
                <HStack spacing="15px">
                    <a href="https://twitter.com/DBankx" rel="noreferrer noopener" target="_blank"><Circle bg="#6F727F" color="#fff" size="40px"><TwitterIcon /></Circle></a>
                    <a href="https://facebook.com/damilola.hundeyin" rel="noreferrer noopener" target="_blank"> <Circle bg="#6F727F" color="#fff" size="40px"><FacebookIcon /></Circle></a>
                    <a href="https://google.com" rel="noreferrer noopener" target="_blank"> <Circle bg="#6F727F" color="#fff" size="40px"><GoogleIcon /></Circle></a>
                </HStack>
            </Center>
            
            <Box className="text__middle" mt="3em">
                <small style={{display: "block", color: "#C5C6CB"}} className="text__bold">&copy; 2020 - {new Date().getFullYear()} Taskr inc.</small>
                <small style={{display: "block", color: "#C5C6CB"}} className=" text__bold">All rights reserved. Google, Google Play, YouTube and other marks are trademarks of Google Inc.</small>
            </Box>
        </Container>
        </Box>
    )
}

export default Footer;