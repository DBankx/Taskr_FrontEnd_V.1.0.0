import React from "react";
import {observer} from "mobx-react-lite";
import { Divider } from "@chakra-ui/react";

const SignUpReminder = () => {
    return (
        <div className="reminder__white__body reminder__fixed reminder__border__dark">
            <p className="text__primary">Post or complete task</p>
            <Divider />
            <small className="text__darker">See a task you can complete ? or Post a task and have runners complete it for you?</small>
            <button className="btn__primary btn btn__block btn__sm">Sign up now &#8594;</button>
        </div>
    )
}

export default observer(SignUpReminder);