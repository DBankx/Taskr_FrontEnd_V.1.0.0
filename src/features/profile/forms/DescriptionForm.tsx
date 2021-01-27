import { Formik } from "formik";
import React, {useContext} from "react";
import {Button, HStack, Textarea} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootstore";

interface IProps{
    description: string;
    cancelEditing: any;
}

const DescriptionForm : React.FC<IProps> = ({description, cancelEditing}) => {
    const {updateProfile} = useContext(rootStoreContext).profileStore;
    return (
        <Formik initialValues={{description: description ? description : ""}} onSubmit={(values, action) => updateProfile(values).then(() => action.setSubmitting(false)).then(() => cancelEditing(false))}>
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
                        <Button type="submit" disabled={isSubmitting} className="btn btn__primary btn__long" isLoading={isSubmitting}>Update</Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default observer(DescriptionForm);