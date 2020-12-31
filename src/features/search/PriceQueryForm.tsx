import {FormControl, FormLabel, HStack, InputLeftElement, InputGroup, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, MenuDivider, Flex, Spacer } from "@chakra-ui/react";
import React from "react";

const PriceQueryForm = () => {
    return (
        <form>
            <div style={{padding: "1em"}}>
            <HStack spacing="24px">
                <FormControl id="min">
                    <FormLabel className="query__price__label">Min</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            fontSize="1.2em"
                            className="query__price__placeholder"
                        >
                            $
                        </InputLeftElement>
                        <NumberInput size="md" defaultValue={0} precision={2} min={0}>
                                <NumberInputField className="query__price__input" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </InputGroup>
                </FormControl>
                <FormControl id="max">
                    <FormLabel className="query__price__label">Max</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            fontSize="1.2em"
                            className="query__price__placeholder"
                        >
                            $
                        </InputLeftElement>
                        <NumberInput size="md" defaultValue={0} precision={2} min={0}>
                            <NumberInputField className="query__price__input" />
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
            <Flex alignItems="center" style={{padding: "0 1em"}}>
                <button className="btn btn__none">Clear All</button>
                <Spacer />
                <button className="btn btn__primary btn__sm">Apply</button>
            </Flex>
        </form>
    )
}

export default PriceQueryForm;