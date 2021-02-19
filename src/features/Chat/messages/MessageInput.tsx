import React, {useContext} from "react"
import {observer} from "mobx-react-lite";
import { Formik } from "formik";
import { Box, IconButton, InputGroup, InputRightElement, Textarea } from "@chakra-ui/react";
import {SendIcon} from "../../../infrastructure/icons/Icons";
import * as yup from "yup";
import rootStoreContext from "../../../application/stores/rootstore";



const MessageInput = () => {
    const {sendMessage} = useContext(rootStoreContext).chatStore;
    const validationSchema = yup.object().shape({
      text: yup.string().required()  
    });
    return (
        <Formik validationSchema={validationSchema} initialValues={{text: ""}} onSubmit={(values, action) => sendMessage(values).then(() => {
            action.setSubmitting(false);
            action.resetForm();
        })}>
            {({
                handleSubmit,
                values,
                handleChange,
                handleBlur,
                isSubmitting,
                errors,
                touched,
                isValid,
                dirty
              }) => (
                <form onSubmit={handleSubmit} className="message__bottom">
                    <Box className="message__input__box">
                        <InputGroup>
                        <Textarea isInvalid={!!errors.text && touched.text} onChange={handleChange} onBlur={handleBlur} value={values.text} className="message__input" placeholder="Type your message..."  resize="none" name="text" rows={1} />
                        <InputRightElement width="8em" height="4.8em">
                            <IconButton disabled={!dirty || !isValid || isSubmitting} isLoading={isSubmitting} type="submit" h="4.8em" w="8em" className="message__input__button" aria-label="Send message" icon={<SendIcon boxSize={9} color={values.text.length > 0 ? "#2DA3EB" : "#D2D3D7"} />} />
                        </InputRightElement>
                        </InputGroup>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default observer(MessageInput);