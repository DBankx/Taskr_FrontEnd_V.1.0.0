import { HStack } from "@chakra-ui/react";
import React from "react";
import {observer} from "mobx-react-lite";
import {StarIcon} from "../../infrastructure/icons/Icons";

interface IProps{
    rating: number;
    boxSize: number;
    justifyContent: string;
}

const Rater : React.FC<IProps> = ({rating, boxSize, justifyContent}) => {
    const iterator = [...Array(rating)];
    return (
        <HStack spacing="4px" justifyContent={justifyContent}>
            {iterator.map((value: undefined, index: number) => (
                <StarIcon boxSize={boxSize} key={index} color={value} />
            ))} 
        </HStack>
    )
}

export default observer(Rater);