import { Formik } from "formik";
import React, {useContext} from "react";
import {Button, HStack, Textarea} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootstore";

interface IProps{
    tagline: string;
    cancelEditing: any;
}

const TagLineForm : React.FC<IProps> = ({tagline, cancelEditing}) => {
    const {updateProfile} = useContext(rootStoreContext).profileStore;
    return (
        <Formik initialValues={{tagline}} onSubmit={(values, action) => updateProfile(values).then(() => action.setSubmitting(false)).then(() => cancelEditing(false))}>
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
                        <Button type="submit" disabled={isSubmitting} className="btn btn__primary btn__long" isLoading={isSubmitting}>Update</Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default observer(TagLineForm);