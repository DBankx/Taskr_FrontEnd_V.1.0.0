import {Box, HStack } from "@chakra-ui/react";
import React from "react";

interface IProps{
    subject: string;
    message: string;
    icon: any;
    type : string;
}

const Alert : React.FC<IProps> = ({subject, message, type, icon}) => {
    return (
        <HStack spacing="10px" className={type === "success" ? "alert_success" : type === "info" ? "alert_info" : type === "error" ? "alert_error" : "alert_warn"}>
            <Box>
                {icon}
            </Box>
            <Box>
            <span className={`alert__subject ${type === "success" ? `alert__subject__success` : type === "info" ? "alert__subject__info" :  type === "error" ? "alert_subject__error" : "alert__subject__warn" }`}>{subject}</span>
            <p className={`alert__message ${type === "success" ? `alert__message__success` : type === "info" ? "alert__message__info" : type === "error" ? "alert__message__error" : "alert__message__warn"}`}>{message}</p>
            </Box>
        </HStack>
    )
}

export default Alert;