import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    HStack,
    Image,
    SimpleGrid
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import {IBid} from "../../../infrastructure/models/bid";
import {BidStatus} from "../../../infrastructure/enums/bid";

interface IProps{
    bids: IBid[]
}

const BidAccordian : React.FC<IProps> = ({bids}) => {
    return (
        <Accordion allowToggle>
            {bids.map((bid) => (
                <AccordionItem key={bid.id}>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            <HStack spacing="10px">
                            <Image src={bid.avatar} alt="bidder-avatar" borderRadius="full" boxSize="30px"  />
                            <p className="text__darker" style={{fontSize: "1.5rem"}}>{bid.userName}</p>
                            </HStack>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <SimpleGrid templateColumns="0.5fr 1fr">
                            <p className="text__silent">Bid amount:</p>
                            <p className="text__darker">${bid.price}</p>
                        </SimpleGrid>

                        <SimpleGrid templateColumns="0.5fr 1fr">
                            <p className="text__silent">Submitted:</p>
                            <p className="text__darker">{new Date(bid.createdAt).toUTCString()}</p>
                        </SimpleGrid>

                        <SimpleGrid templateColumns="0.5fr 1fr">
                            <p className="text__silent">Status:</p>
                            <p className="text__darker">{BidStatus[bid.status]}</p>
                        </SimpleGrid>
                    </AccordionPanel>
                </AccordionItem>  
            ))}
            
        </Accordion>
    )
}

export default observer(BidAccordian);