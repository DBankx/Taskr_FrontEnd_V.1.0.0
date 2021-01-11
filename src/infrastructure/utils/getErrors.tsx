import {toast} from "react-toastify";
import Alert from "../../application/common/Alert";
import {CloseIcon} from "../icons/Icons";
import React from "react";

export function alertErrors(errors: any){
    const errorValuesArray = Object.values(errors.response.data.errors);
    errorValuesArray.forEach((err: any) => (
        toast.error(<Alert type="error" subject="Error occurred" icon={<CloseIcon boxSize={8} color="#73000c"/>} message={err} />)
))
}