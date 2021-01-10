import React from "react";
import {IBid} from "../../../infrastructure/models/bid";
import {observer} from "mobx-react-lite";
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr, Image, HStack } from "@chakra-ui/react";
import getBidStatus from "../../../infrastructure/utils/getBidStatus";

interface IProps{
    bids: IBid[]
}

const BidTable : React.FC<IProps> = ({bids}) => {
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
                         <Td>{getBidStatus(bid.status)}</Td>
                     </Tr>   
                    ))}
                </Tbody>
            </Table> 
        </div>
    )
}

export default observer(BidTable);