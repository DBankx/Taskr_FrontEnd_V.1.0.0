import { Formik } from "formik";
import React from "react";
import {Button, HStack, Textarea} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";

interface IProps{
    tagline: string;
    cancelEditing: any;
}

const TagLineForm : React.FC<IProps> = ({tagline, cancelEditing}) => {
    return (
        <Formik initialValues={{tagline}} onSubmit={values => console.log(values)}>
            {({
                  values,
                  isSubmitting,
                  handleSubmit,
                  handleBlur,
                  handleChange
              }) => (
                <form onSubmit={handleSubmit}>
                    <Textarea name="tagline" className="form__textarea form__textarea__no__label" id="title" rows={7} placeholder="Write a catchy phrase E.g I am awesome" onChange={handleChange} onBlur={handleBlur} value={values.tagline} />
                    <HStack justifyContent="space-between">
                        <Button onClick={() => cancelEditing(false)} className="btn btn__long" type="button">Cancel</Button>
                        <Button className="btn btn__primary btn__long" isLoading={isSubmitting}>Update</Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default observer(TagLineForm);