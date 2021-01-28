import React from "react";
import {observer} from "mobx-react-lite";
import { HStack, Image } from "@chakra-ui/react";
import Rater from "./Rater";
import { Link } from "react-router-dom";

const Review = () => {
    return (
        <div>
            <HStack alignItems="start" spacing="10px">
                <Image boxSize="50px" borderRadius="full" src="https://ui-avatars.com/api/?name=$SandraBull_ock&rounded=true&bold=true&background=FCDADC&color=3D3373" alt="user-avatar" />
                <div>
                    <Link to="/" className="text__blue">Merge and edit videos</Link>
                    <HStack spacing="5px">
                        <Rater justifyContent="flex-start" rating={3} boxSize={5} />
                        <p>3</p>
                    </HStack>
                    <p className="text__light__dark">&quot;Thanks Marion brilliant job.
                        Prompt and excellent work.
                        Would use again anytime &quot;</p>
                    <HStack spacing="10px">
                    <Link to="/" className="text__blue text__sm text__bold">- SandraBull_ock</Link>
                        <p>•</p>
                        <small className="text__silent">4 days ago</small>
                    </HStack>
                </div>
            </HStack>
        </div>
    )
}

export default observer(Review);