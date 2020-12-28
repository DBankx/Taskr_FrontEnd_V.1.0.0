import { Spinner } from "@chakra-ui/react";
import React from "react";

export default function Loader(){
    return (
        <div className="middle">
            <Spinner size="lg" color="brand.100"  />
        </div>
    )
}