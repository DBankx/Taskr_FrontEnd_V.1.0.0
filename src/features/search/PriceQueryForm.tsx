import {FormControl, FormLabel, HStack, InputLeftElement, InputGroup, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, MenuDivider, Flex, Spacer } from "@chakra-ui/react";
import { Formik } from "formik";
import React from "react";
import {NumberParam, StringParam, useQueryParams} from "use-query-params";
import {observer} from "mobx-react-lite";

interface IProps{
    onClose: any;
}

const PriceQueryForm = ({onClose}: IProps) => {
    const [queryParams, setParams] = useQueryParams({
        title: StringParam,
        deliveryType: NumberParam,
        category: NumberParam,
        sortBy: StringParam,
        minPrice: NumberParam,
        maxPrice: NumberParam
    })
    
    return (
        <Formik initialValues={{minPrice: 0, maxPrice: 0}} onSubmit={values => {
            setParams({...queryParams, minPrice: values.minPrice, maxPrice: values.maxPrice});
            onClose();
        }}>
            {({
                handleSubmit,
                values,
                handleChange,
                handleBlur,
                resetForm
              }) => (
           <form onSubmit={handleSubmit} className="">
            <div style={{padding: "1em"}}>
            <HStack spacing="24px">
                <FormControl name="minPrice">
                    <FormLabel className="query__price__label">Min</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            fontSize="1.2em"
                            className="query__price__placeholder"
                        >
                            $
                        </InputLeftElement>
                        <NumberInput value={values.minPrice} name="minPrice"  defaultValue={0} size="md" precision={2} min={0}>
                                <NumberInputField type="number" value={values.minPrice} onBlur={handleBlur} onChange={handleChange} className="query__price__input" name="minPrice" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </InputGroup>
                </FormControl>
                <FormControl name="maxPrice">
                    <FormLabel className="query__price__label">Max</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            fontSize="1.2em"
                            className="query__price__placeholder"
                        >
                            $
                        </InputLeftElement>
                        <NumberInput value={values.maxPrice} name="maxPrice" size="md" defaultValue={0} precision={2} min={0}>
                            <NumberInputField type="number" value={values.maxPrice} onChange={handleChange} onBlur={handleBlur} name="maxPrice"  className="query__price__input" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </InputGroup>
                </FormControl> 
            </HStack>
            </div>
            <MenuDivider />
            <Flex alignItems="center" style={{padding: "0.5em 1em"}}>
                <button onClick={() => resetForm()} type="button" className="btn btn__none">Clear All</button>
                <Spacer />
                <button type="submit" className="btn btn__primary btn__sm">Apply</button>
            </Flex>
        </form>
            )}
        </Formik>
    )
}

export default observer(PriceQueryForm);