import React, {useState} from "react";
import {IBid} from "../../../infrastructure/models/bid";
import {observer} from "mobx-react-lite";
import {Table, TableCaption, Tbody, Td, Th, Thead, Tr, Image, HStack, Button, useDisclosure} from "@chakra-ui/react";
import {ITask} from "../../../infrastructure/models/task";
import BidModalDetails from "./BidModalDetails";
import {BidStatus} from "../../../infrastructure/enums/bid";

interface IProps{
    bids: IBid[];
    task: ITask
}

const BidTable : React.FC<IProps> = ({bids, task}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [bidId, setBidId] = useState<string>("");
    return (
        <div>
            <Table variant="simple" style={{position: "relative"}}>
                <TableCaption>If 2 people bid the same amount, the first bid takes priority.</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Bidder</Th>
                        <Th>Bid amount</Th>
                        <Th>Submitted at</Th>
                        <Th>Status</Th>
                        {task.isOwner && <Th>Action</Th>}
                    </Tr>
                </Thead>
                <Tbody>
                    {bids.map((bid) => (
                     <Tr key={bid.id}>
                         <Td>
                             <HStack spacing="10px" alignItems="center">
                             <Image src={bid.avatar} borderRadius="full" boxSize="20px" alt="bidder-avatar" />
                                 <p>{bid.userName}</p>
                             </HStack>
                             </Td>
                         <Td>${bid.price}</Td>
                         <Td>{new Date(bid.createdAt).toUTCString()}</Td>
                         <Td>{BidStatus[bid.status]}</Td>
                         {task.isOwner && <Td><Button className="btn btn__outlined" onClick={() => {
                             onOpen();
                             setBidId(bid.id);
                         }}>view</Button></Td>}
                     </Tr>   
                    ))}
                </Tbody>
            </Table> 
            <BidModalDetails task={task} bidId={bidId} isOpen={isOpen} onClose={onClose} />
        </div>
    )
}

export default observer(BidTable);