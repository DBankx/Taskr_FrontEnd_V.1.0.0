import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    HStack,
    Image,
    SimpleGrid, useDisclosure
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, {useState} from "react";
import {IBid} from "../../../infrastructure/models/bid";
import {BidStatus} from "../../../infrastructure/enums/bid";
import {ITask} from "../../../infrastructure/models/task";
import BidModalDetails from "./BidModalDetails";

interface IProps{
    bids: IBid[];
    task: ITask;
}

const BidAccordian : React.FC<IProps> = ({bids, task}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [bidId, setBidId] = useState<string>("");
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
                        
                        {task.isOwner && <Button className="btn btn__outlined btn__full-width" onClick={() => {
                            onOpen();
                            setBidId(bid.id);
                        }}>view</Button>}
                    </AccordionPanel>
                </AccordionItem>  
            ))}
            <BidModalDetails task={task} bidId={bidId} isOpen={isOpen} onClose={onClose} />
        </Accordion>
    )
}

export default observer(BidAccordian);