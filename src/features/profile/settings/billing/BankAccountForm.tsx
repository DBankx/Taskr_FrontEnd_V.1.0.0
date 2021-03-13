import React, {useContext} from "react";
import {Formik} from "formik";
import {observer} from "mobx-react-lite";
import { Box, Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Select } from "@chakra-ui/react";
import * as yup from "yup";
import rootStoreContext from "../../../../application/stores/rootstore";

interface IProps{
    setBankForm: any;
}

const BankAccountForm = ({setBankForm} : IProps) => {
    const {addBankAccount} = useContext(rootStoreContext).profileStore;
    const ValidationSchema = yup.object().shape({
        accountNumber: yup.string().required("Account number is required"),
        routingNumber: yup.string().required("Routing number is required").length(9, "Please input a valid 9 digit routing number"),
        accountHolderName: yup.string().required("Account holder name is required"),
        accountHolderType: yup.string().required("Account type is required")
    });
    
    return (
        <Box>
            <Center>
                <p className="text__silent">Please provide your US bank account details below</p>
            </Center>
            <Box mt={4}>
            <Formik validationSchema={ValidationSchema} initialValues={{accountNumber: "", routingNumber: "", accountHolderType: "", accountHolderName: "" }} onSubmit={(values, action) => {
                addBankAccount({...values, accountNumber: values.accountNumber.toString()}).then(() => setBankForm(false)).catch(() => action.setSubmitting(false));
            }}>
                {({
                    handleSubmit,
                    values,
                    handleBlur,
                    handleChange,
                    errors,
                    touched,
                    isValid,
                    dirty,
                    isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={!!errors.accountNumber && touched.accountNumber} id="account" isRequired>
                            <FormLabel style={{fontSize: "1em"}}>Bank Account</FormLabel>
                            <Input min="0" type="number" isInvalid={!!errors.accountNumber && touched.accountNumber} className="form__input" onChange={handleChange} onBlur={handleBlur} value={values.accountNumber} placeholder="012345678912" name="accountNumber"  />
                            {errors.accountNumber && touched.accountNumber ? <FormErrorMessage style={{fontSize: "0.8em"}}>{errors.accountNumber}</FormErrorMessage> : <FormHelperText style={{fontSize: "0.8em"}}> We&apos;ll never share your bank account number</FormHelperText>}
                        </FormControl>

                        <FormControl mt="1em" isInvalid={!!errors.accountHolderName && touched.accountHolderName} id="account" isRequired>
                            <FormLabel style={{fontSize: "1em"}}>Account Holder Name</FormLabel>
                            <Input type="string" isInvalid={!!errors.accountHolderName && touched.accountHolderName} className="form__input" onChange={handleChange} onBlur={handleBlur} value={values.accountHolderName} placeholder="John Doe" name="accountHolderName"  />
                            {errors.accountHolderName && touched.accountHolderName ? <FormErrorMessage style={{fontSize: "0.8em"}}>{errors.accountHolderName}</FormErrorMessage> : <FormHelperText style={{fontSize: "0.8em"}}> The full name on the bank account</FormHelperText>}
                        </FormControl>

                        <FormControl mt="1em" isInvalid={!!errors.accountHolderType && touched.accountHolderType} id="account" isRequired>
                            <FormLabel style={{fontSize: "1em"}}>Account Type</FormLabel>
                            <Select type="string" isInvalid={!!errors.accountHolderType && touched.accountHolderType} className="form__select" onChange={handleChange} onBlur={handleBlur} value={values.accountHolderType} placeholder="Select account type" name="accountHolderType">
                                <option value="Individual">Individual</option>
                                <option value="Business">Business</option>
                            </Select>
                            {errors.accountHolderType && touched.accountHolderType ? <FormErrorMessage style={{fontSize: "0.8em"}}>{errors.accountHolderType}</FormErrorMessage> : <FormHelperText style={{fontSize: "0.8em"}}> The type of account you have</FormHelperText>}
                        </FormControl>

                        <Box mt="1em">
                            <FormControl id="routingNumber" isInvalid={!!errors.routingNumber && touched.routingNumber}  isRequired>
                                <FormLabel style={{fontSize: "1em"}}>Routing Number</FormLabel>
                                <Input min="0"  onChange={handleChange} onBlur={handleBlur} type="number" isInvalid={!!errors.routingNumber && touched.routingNumber} className="form__input" placeholder="9 digit routing number" value={values.routingNumber} name="routingNumber" />
                                {errors.routingNumber && touched.routingNumber && <FormErrorMessage
                                    style={{fontSize: "0.8em"}}>{errors.routingNumber}</FormErrorMessage>
                                }
                            </FormControl>
                                </Box>
                        
                        <HStack mt="1em" justifyContent="flex-end" spacing="10px">
                            <Button type="button" onClick={() => setBankForm(false)} className="btn btn__nm">Cancel</Button>
                            <Button type="submit" isLoading={isSubmitting} disabled={!isValid || isSubmitting || !dirty} className="btn btn__nm btn__primary">Add account</Button>
                        </HStack>
                    </form>
                )}
            </Formik>
            </Box>
        </Box>
    )
}

export default observer(BankAccountForm);