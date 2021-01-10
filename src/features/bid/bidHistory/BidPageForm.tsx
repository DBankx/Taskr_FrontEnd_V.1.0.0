import { Formik } from "formik";
import React, {useContext} from "react";
import {ITask} from "../../../infrastructure/models/task";
import {IBidSubmission} from "../../../infrastructure/models/bid";
import {
    Button,
    InputGroup,
    InputLeftElement, NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    SimpleGrid
} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import * as yup from "yup";
import rootStoreContext from "../../../application/stores/rootstore";

interface IProps{
    task: ITask
}

const BidPageForm : React.FC<IProps> = ({task}) => {
    const validationSchema = yup.object().shape({
        price: yup.number().lessThan(task.initialPrice, `Price must be less than initial bid: $${task.initialPrice} `)
    });
    const {createBid} = useContext(rootStoreContext).bidStore;
    return (
        <Formik validationSchema={validationSchema} initialValues={{price: 0}} onSubmit={(values: IBidSubmission) => createBid(values, task.id)}>
            {({
                handleSubmit,
                handleBlur,
                handleChange,
                errors,
                touched,
                values,
                isValid,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                    <SimpleGrid templateColumns={{xl: "2fr 1fr", lg: "2fr 1fr", md: "1fr", sm: "1fr"}} spacing="10px">
                        <div>
                            <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                fontSize="1.2em"
                                className="query__price__placeholder"
                            >
                                $
                            </InputLeftElement>
                            <NumberInput max={task.initialPrice} clampValueOnBlur={false}  size="md" defaultValue={0} precision={2} min={0}>
                                <NumberInputField name="price" error={errors.price && touched.price} value={values.price} onChange={handleChange} onBlur={handleBlur}  className="task__price__input" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>

                            </NumberInput>
                        </InputGroup>
                            {errors.price ? <small className="form__error">{errors.price}</small> :<small className="form__sm__text">Enter ${task.initialPrice} or less</small>}
                        </div>
                        <div>
                            <Button disabled={!isValid || isSubmitting} isLoading={isSubmitting} style={{fontWeight: 500}} type="submit" className="btn btn__primary btn__sm">Place Bid</Button>
                        </div>
                    </SimpleGrid>
                </form>
            )}
        </Formik>
    )
}

export default observer(BidPageForm);