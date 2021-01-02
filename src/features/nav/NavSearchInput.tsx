import {IconButton, InputGroup, InputLeftElement, Input} from "@chakra-ui/react";
import React from "react";
import {LocationIcon, SearchIcon} from "../../infrastructure/icons/Icons";
import {observer} from "mobx-react-lite";
import { Formik } from "formik";
import {StringParam, useQueryParams} from "use-query-params";
import {history} from "../../index";
import {useLocation} from "react-router-dom";

const NavSearchInput = () => {
   const [navQuery, setNavQuery] = useQueryParams({
       title: StringParam,
       city: StringParam
   });
   const location = useLocation();
    return (
        <Formik initialValues={{title: navQuery.title ? navQuery.title : "", city: navQuery.city ? navQuery.city : ""}} onSubmit={(values, action) => {
            if(location.pathname !== "/tasks"){
                history.push("/tasks")
            }
            setNavQuery({
                title: values.title,
                city: values.city
            });
            action.setSubmitting(false);
        }}>
            {({
                handleSubmit,
                handleBlur,
                handleChange,
                values,
                isSubmitting
              }) => (
                <form className="navbar__search" onSubmit={handleSubmit}>
                    <input placeholder="Find services..." name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} className="navbar__search__input search__main" />
                    <InputGroup className="navbar__input__group">
                        <InputLeftElement className="navbar__input__group__right">
                            <LocationIcon boxSize={8} />
                        </InputLeftElement>
                        <Input name="city" onBlur={handleBlur} onChange={handleChange} value={values.city} placeholder="Location" className="navbar__search__input search__location" />
                    </InputGroup>
                    <IconButton type="submit" isLoading={isSubmitting} className="navbar__search__button" aria-label="Search anything..." icon={<SearchIcon boxSize={8} />} />
                </form>         
            )}
        </Formik>
    )
}

export default observer(NavSearchInput);