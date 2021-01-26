import { Formik } from "formik";
import React from "react";
import {Button, HStack, Input, Select} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {getAllEnumKeys} from "../../../infrastructure/enums/enumFunctions";
import {ExperienceLevel} from "../../../infrastructure/enums/skill";

interface IProps{
    cancelEditing: any;
}

const LanguageForm : React.FC<IProps> = ({cancelEditing}) => {
    return (
        <Formik initialValues={{languageName: "", experienceLevel: ""}} onSubmit={values => console.log(values)}>
            {({
                  values,
                  isSubmitting,
                  handleSubmit,
                  handleBlur,
                  handleChange,
                  errors,
                  touched
              }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form__field">
                        <Input placeholder="Name of a language E.g. English"  className="form__input" name="languageName" onChange={handleChange} onBlur={handleBlur} value={values.languageName} />
                    </div>
                    <div className="form__field">
                        <Select isInvalid={!!errors.experienceLevel && touched.experienceLevel} name="experienceLevel" onChange={handleChange} onBlur={handleBlur} value={values.experienceLevel} size="lg" className="form__select" placeholder="Experience Level">
                            {getAllEnumKeys(ExperienceLevel).map((experienceLevel, i) => (
                                <option key={i} value={i} >
                                    {experienceLevel}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <HStack justifyContent="space-between">
                        <Button onClick={() => cancelEditing(false)} className="btn btn__long" type="button">Cancel</Button>
                        <Button className="btn btn__primary btn__long" isLoading={isSubmitting}>Add Language</Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default observer(LanguageForm);