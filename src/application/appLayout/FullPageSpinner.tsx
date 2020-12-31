import { Spinner } from "@chakra-ui/react";
import React from "react";

export default function Loader(){
    return (
        <div className="middle_position">
            <Spinner size="xl" color="brand.100"  />
        </div>
    )
}