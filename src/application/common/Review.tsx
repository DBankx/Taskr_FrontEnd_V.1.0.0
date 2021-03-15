import React from "react";
import {observer} from "mobx-react-lite";
import { HStack, Image } from "@chakra-ui/react";
import Rater from "./Rater";
import { Link } from "react-router-dom";
import {IReview} from "../../infrastructure/models/order";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IProps{
    review: IReview
}

const Review = ({review}: IProps) => {
    return (
        <div>
            <HStack alignItems="start" spacing="10px">
                <Image width="50px" height="50px" className="avatar" borderRadius="full" src={review.reviewer.avatar} alt="user-avatar" />
                <div>
                    <Link to={`/task/${review.job.id}`} className="text__blue">{review.job.title}</Link>
                    <HStack spacing="5px">
                        <Rater justifyContent="flex-start" rating={review.rating} boxSize={5} />
                        <p>{review.rating}</p>
                    </HStack>
                    <p className="text__light__dark">&quot;{review.text}&quot;</p>
                    <HStack spacing="10px">
                    <Link to={`/public-profile/${review.reviewer.id}`} className="text__blue text__sm text__bold">- {review.reviewer.username}</Link>
                        <p>•</p>
                        <small className="text__silent">{dayjs(review.postedAt).fromNow()}</small>
                    </HStack>
                </div>
            </HStack>
        </div>
    )
}

export default observer(Review);