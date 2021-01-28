import React from "react";
import {observer} from "mobx-react-lite";
import { Select, Box, Divider } from "@chakra-ui/react";
import Review from "../../../../application/common/Review";

const TaskrReviews = () => {
    return (
        <div>
            <div style={{width: "fit-content"}}>
            <Select placeholder="Sort Reviews" className="form__select">
                <option value="Recent">Most Recent</option>
                <option value="Negative">Negative Reviews</option>
                <option value="Positive">Positive Reviews</option>
            </Select>
            </div>
            <Box mt={4} mb={4}>
                <Review />
                <Divider mt={3} mb={3} />
                <Review />
                <Divider mt={3} mb={3} />
                <Review />
                <Divider mt={3} mb={3} />
            </Box>
        </div>
    )
}

export default observer(TaskrReviews);