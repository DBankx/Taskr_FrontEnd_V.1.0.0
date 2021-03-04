import React, {useContext, useEffect, Fragment, useState} from "react";
import rootStoreContext from "../../../application/stores/rootstore";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Stack, Box, HStack, Image, VStack, Tooltip } from "@chakra-ui/react";
import {Link} from "react-router-dom";
import Loader from "../../../application/appLayout/FullPageSpinner";
import {observer} from "mobx-react-lite";
import Rater from "../../../application/common/Rater";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {ITask} from "../../../infrastructure/models/task";
import {CheckmarkIcon, EyeIcon} from "../../../infrastructure/icons/Icons";
import {BidStatus} from "../../../infrastructure/enums/bid";
import {loadStripe} from "@stripe/stripe-js/pure";

dayjs.extend(relativeTime);

interface IProps{
    bidId: string;
    onClose: any;
    isOpen: any;
    task: ITask
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const BidModalDetails : React.FC<IProps> = ({bidId, onClose, isOpen, task}) => {
    const {bid, getBidById, loadingBid, markingBidAsSeen, markBidAsSeen} = useContext(rootStoreContext).bidStore;
    const {token} = useContext(rootStoreContext).authStore;
    const {deleteOrderById} = useContext(rootStoreContext).orderStore;
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        isOpen && getBidById(bidId);
        const query = new URLSearchParams(window.location.search);
        if(query.get("success")){
            setMessage("Order placed! you will enjoy now")
        }
        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, [getBidById, bidId, isOpen]);
    
    
    
    return (
        <Modal scrollBehavior="inside" size="lg" motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {loadingBid || bid === null ? <Loader /> : (
                    <Fragment>
                <ModalHeader><p className="text__darker text__bigger__md">{task.title}</p></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {message}
                   <Stack direction={["column", "row"]} justifyContent="space-between" alignItems={{xl: "flex-end", lg: "flex-end", sm: "flex-start"}}>
                       <Box>
                           <HStack spacing="10px">
                               <Image src={bid.bidCreator.avatar} alt="bidder-avatar" borderRadius="full" boxSize="60px" />
                               <Box style={{lineHeight: "24px"}}>
                                   <Link to="/" className="text__blue text__bigger__md">{bid.bidCreator.userName}</Link>
                                   <HStack spacing="10px">
                                   <Rater boxSize={6} rating={4} justifyContent="flex-start" />
                                   <p className="text__black">4.0</p>
                                       <p className="text__light__grey">(2,804)</p>
                                   </HStack>
                                   <p className="text__light__grey">Joined {dayjs(bid.bidCreator.createdAt).fromNow()}</p>
                               </Box>
                           </HStack>
                       </Box>

                       <VStack justifyContent={{xl: "space-between", md: "space-between", lg: "space-between", sm: "flex-start"}} alignItems="start">
                           <Tooltip hasArrow label="Let bidder know you have seen their bid but havent made a desicion yet" style={{background: "rgb(41, 43, 50)", fontSize: "0.8em"}} color="#fff" >
                               {bid.status === BidStatus.Seen ? <p className="text__silent">Marked as seen</p> :<Button isLoading={markingBidAsSeen} leftIcon={<EyeIcon />} variant="ghost" className="btn btn__ghost" onClick={() => markBidAsSeen(bid.id)}>
                               Mark as seen
                           </Button>}
                           </Tooltip>
                       <p className="text__darker">Offer: <span className="text__green text__bigger__md text__bold">${bid.price}</span></p>
                       </VStack>
                   </Stack> 
                    
                    {bid.description ? <Box p="0.75em" className="bid__description">
                        {bid.description} 
                </Box> : (
                    <p className="text__silent text__italic" >{bid.bidCreator.userName} didnt add a description</p>
                    ) }
                    <Box>
                        <small className="text__light__grey">{dayjs(bid.createdAt).fromNow()}</small>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button className="btn" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={async () => {
                        const stripe = await stripePromise;
                       const response = await fetch(`https://localhost:44351/api/v1/bids/accept/${task.id}/${bid.id}`, {
                           method: "POST",
                           headers: {
                               "Accept": "application/json",
                               "Authorization": "Bearer " + token,
                               "Content-Type": "application/json"
                           }
                       });
                        const session = await response.json();
                        // When the customer clicks on the button, redirect them to Checkout.
                        const result = await stripe!.redirectToCheckout({
                            sessionId: session.checkoutSessionId,
                        });
                        
                        if(result.error){
                           await deleteOrderById(session.id); 
                        }

                    }} type="button" id="checkout-button" role="link" className="btn btn__green" leftIcon={<CheckmarkIcon />}>Accept Bid and pay</Button>
                </ModalFooter>
                    </Fragment>
                    )}
            </ModalContent>
        </Modal>
    )
}

export default observer(BidModalDetails);
