import { Spinner } from "@chakra-ui/react";
import React from "react";

const InlineLoader = () => {
    return (
        <div className="spinner__inline">
            <Spinner size="xl" color="brand.200" />
        </div>
    )
}

export default InlineLoader;