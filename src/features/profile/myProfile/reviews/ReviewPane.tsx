import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import { Select, Box, Divider } from "@chakra-ui/react";
import Review from "../../../../application/common/Review";
import rootStoreContext from "../../../../application/stores/rootstore";
import InlineLoader from "../../../../application/appLayout/InlineLoader";

interface IProps{
    userId: string;
    predicate: string;
}

const ReviewPane = ({userId, predicate}: IProps) => {
    const {loadingReviews, getUserReveiws, reviews} = useContext(rootStoreContext).publicProfileStore;
    useEffect(() => {
        getUserReveiws(userId, predicate);
    }, [userId, getUserReveiws, predicate])
    if(loadingReviews || reviews === null ) return <InlineLoader />
    return (
        <div>
            <div style={{width: "fit-content"}}>
            <Select placeholder="Sort Reviews" className="form__select__sm">
                <option value="Recent">Most Recent</option>
                <option value="Negative">Negative Reviews</option>
                <option value="Positive">Positive Reviews</option>
            </Select>
            </div>
            <Box mt={10} mb={4}>
                {reviews.reviews.length > 0 ? reviews.reviews.map((review) => (
                    <Box key={review.id}>
                        <Review review={review}/>
                        <Divider mt={3} mb={3} />
                    </Box>
                )) : (
                    <p>No reviews as {predicate} yet. Watch this space!</p>
                )}
           </Box>
        </div>
    )
}

export default observer(ReviewPane);