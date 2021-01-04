import {
    InputGroup,
    InputLeftElement, NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Button
} from "@chakra-ui/react";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import {IBidSubmission} from "../../infrastructure/models/bid";
import {ITask} from "../../infrastructure/models/task";

interface IProps{
    task: ITask
}

const BidForm : React.FC<IProps> = ({task}) => {
    return (
        <Formik initialValues={{description: "", price: 0}} onSubmit={(values: IBidSubmission) => console.log(values)}>
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting,
                values
              }) => (
                <form onSubmit={handleSubmit} style={{marginTop: "1em"}} className="task__bid__form__card">
                    <p>Place a bid</p>
                    <div className="form__field">
                        <label data-testid="label" className="form__textarea__label" id="message-Your Message" htmlFor="description">Your Message</label>
                        <textarea data-testid="input" value={values.description} onChange={handleChange} onBlur={handleBlur} className="form__textarea" id="description" rows={3} name="description" />
                    </div>
                    <div className="form__field">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                fontSize="1.2em"
                                className="query__price__placeholder"
                            >
                                $
                            </InputLeftElement>
                            <NumberInput size="md" defaultValue={0} precision={2} min={0}>
                                <NumberInputField name="price" value={values.price} onChange={handleChange} onBlur={handleBlur}  className="task__price__input" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>

                            </NumberInput>
                        </InputGroup>
                        <small className="form__sm__text">Enter ${task.initialPrice} or less</small>
                    </div>
                    <div className="form__field">
                        <Button isLoading={isSubmitting} type="submit" className="btn btn__primary btn__bg btn__full-width">Submit bid</Button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default observer(BidForm);