import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import { Formik } from "formik";
import {FormControl, FormErrorMessage, FormLabel, HStack, Image, Select, Box, Textarea, Button} from "@chakra-ui/react";
import {IOrder} from "../../../infrastructure/models/order";
import Rater from "../../../application/common/Rater";
import rootStoreContext from "../../../application/stores/rootstore";

interface IProps{
    order: IOrder,
}

const ReviewForm= ({order}: IProps) => {
    const {addReview} = useContext(rootStoreContext).orderStore;
    const {user} = useContext(rootStoreContext).authStore;
    return (
        <Formik initialValues={{text: "", rating: "0"}} onSubmit={values => addReview({...values, rating: parseInt(values.rating)}, order.orderNumber)}>
            {({
                handleSubmit,
                errors,
                touched,
                handleChange,
                handleBlur,
                values,
                isSubmitting,
                isValid,
                dirty
              }) => (
                <form  onSubmit={handleSubmit}>
                    <HStack spacing="20px" alignItems="flex-start">
                        <Image src={user!.avatar} alt="reviewer-avatar" className="avatar" width="50px" height="50px"  />
                        <Box width="100%">
                            <FormControl isInvalid={!!errors.rating && touched.rating} id="account" isRequired>
                                <FormLabel style={{fontSize: "1em"}}>Please leave a rating for {user!.id === order.payTo.id ? order.user.username : order.payTo.username }</FormLabel>
                                <HStack spacing="10px">
                                <Select style={{maxWidth: "150px"}} width="150px"  isInvalid={!!errors.rating && touched.rating} className="form__select__sm" onChange={handleChange} onBlur={handleBlur} value={values.rating} placeholder={`Please give a rating from 0 - 5 `} name="rating">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                   <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                    </Select>
                                <Rater rating={parseInt(values.rating)} justifyContent="flex-start" boxSize={6} />
                                </HStack>
                                {errors.rating && touched.rating && <FormErrorMessage style={{fontSize: "0.8em"}}>{errors.rating}</FormErrorMessage>}
                            </FormControl>
                            <FormControl mt="1em" isInvalid={!!errors.text && touched.text} id="account" isRequired>
                                <Textarea rows={4} isInvalid={!!errors.text && touched.text} className="form__textarea form__textarea__no__label" onChange={handleChange} onBlur={handleBlur} value={values.text} placeholder="Describe what you enjoyed working with the person" name="text"  />
                                {errors.text && touched.text && <FormErrorMessage style={{fontSize: "0.8em"}}>{errors.text}</FormErrorMessage>}
                            </FormControl>
                            <Box mt="1em">
                                <Button isLoading={isSubmitting} disabled={!dirty || isSubmitting || !isValid} type="submit" style={{float: "right"}} className="btn btn__primary btn__nm">
                                    Submit review
                                </Button>
                            </Box>
                        </Box>
                    </HStack>
                </form>
            )}
                   </Formik>
    )
}

export default observer(ReviewForm)