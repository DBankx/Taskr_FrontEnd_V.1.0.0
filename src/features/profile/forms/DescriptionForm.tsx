import { Formik } from "formik";
import React from "react";
import {Button, HStack, Textarea} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";

interface IProps{
    description: string;
    cancelEditing: any;
}

const DescriptionForm : React.FC<IProps> = ({description, cancelEditing}) => {
    return (
        <Formik initialValues={{description}} onSubmit={values => console.log(values)}>
            {({
                values,
                isSubmitting,
                handleSubmit,
                handleBlur,
                handleChange
            }) => (
                <form onSubmit={handleSubmit}>
                    <Textarea name="description" className="form__textarea form__textarea__no__label" id="title" rows={7} placeholder="Tell your customers about your self and what you can provide" onChange={handleChange} onBlur={handleBlur} value={values.description} />
                    <HStack justifyContent="space-between">
                        <Button onClick={() => cancelEditing(false)} className="btn btn__long" type="button">Cancel</Button>
                        <Button className="btn btn__primary btn__long" isLoading={isSubmitting}>Update</Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default observer(DescriptionForm);