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
    return (
        <HStack spacing="4px" justifyContent={justifyContent}>
            {Array(5)
                .fill("")
                .map((_, i) => (
                    <StarIcon
                        key={`${_}${i}`}
                        color={i < rating ? "#FFC100" : "gray.300"}
                        boxSize={boxSize}
                    />
                ))}
        </HStack>
    )
}

export default observer(Rater);