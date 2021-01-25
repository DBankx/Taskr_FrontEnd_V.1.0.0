import { Formik } from "formik";
import React from "react";
import {Button, HStack, Input, Select} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {getAllEnumKeys} from "../../../infrastructure/enums/enumFunctions";
import {ExperienceLevel} from "../../../infrastructure/enums/skill";

interface IProps{
    cancelEditing: any;
}

const SkillsForm    : React.FC<IProps> = ({cancelEditing}) => {
    return (
        <Formik initialValues={{skillName: "", experienceLevel: ""}} onSubmit={values => console.log(values)}>
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
                 <Input placeholder="Name of a skill E.g. Coding" mt={4} mb={3} className="form__input" name="skillName" onChange={handleChange} onBlur={handleBlur} value={values.skillName} />
                    <Select mb={3} isInvalid={!!errors.experienceLevel && touched.experienceLevel} name="experienceLevel" onChange={handleChange} onBlur={handleBlur} value={values.experienceLevel} size="lg" className="form__select" placeholder="Experience Level">
                        {getAllEnumKeys(ExperienceLevel).map((experienceLevel, i) => (
                            <option key={i} value={i} >
                                {experienceLevel}
                            </option>
                        ))}
                    </Select>
                    <HStack justifyContent="space-between">
                        <Button onClick={() => cancelEditing(false)} className="btn btn__long" type="button">Cancel</Button>
                        <Button className="btn btn__primary btn__long" isLoading={isSubmitting}>Add Skill</Button>
                    </HStack>
                </form>
            )}
        </Formik>
    )
}

export default observer(SkillsForm);