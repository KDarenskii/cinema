import { Formik } from "formik";
import React from "react";
import { api } from "../../api";
import { ALERT } from "../../constants/alertTypes";
import ActionButton from "../ActionButton";
import Alert from "../Alert";
import FormErrorMessage from "../FormElements/FormErrorMessage";
import Input from "../FormElements/Input";
import { registerScheme } from "./registerScheme";
import { nanoid } from "@reduxjs/toolkit";

import "./styles.scss";

interface Values {
    email: string;
    password: string;
    confirmPassword: string;
    nickname: string;
}

const RegisterForm: React.FC = () => {
    const [error, setError] = React.useState<string | null>(null);

    const initialValues: Values = {
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
    };

    const handleSubmit = async (values: Values) => {

        const { email, password, confirmPassword, nickname } = values;

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return;
        }

        const newUser = {
            email,
            password,
            nickname,
            id: nanoid()
        }

        try {
            const response = await api.post("users", newUser);
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Formik
            onSubmit={handleSubmit}
            onChange={() => setError(null)}
            initialValues={initialValues}
            validationSchema={registerScheme}
        >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
                <form className="register-form" onSubmit={handleSubmit}>
                    {error && <Alert className="register-form__alert" type={ALERT.ERROR} message={error} />}
                    <div className="register-form__item">
                        <Input
                            className="register-form__input"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            type="text"
                            placeholder="Email"
                            name="email"
                        />
                        {errors.email && touched.email && (
                            <FormErrorMessage className="register-form__error" message={errors.email} />
                        )}
                    </div>
                    <div className="register-form__item">
                        <Input
                            className="register-form__input"
                            value={values.nickname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            type="text"
                            placeholder="Nickname"
                            name="nickname"
                        />
                        {errors.nickname && touched.nickname && (
                            <FormErrorMessage className="register-form__error" message={errors.nickname} />
                        )}
                    </div>
                    <div className="register-form__item">
                        <Input
                            className="register-form__input"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                        {errors.password && touched.password && (
                            <FormErrorMessage className="register-form__error" message={errors.password} />
                        )}
                    </div>
                    <div className="register-form__item">
                        <Input
                            className="register-form__input"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            type="password"
                            placeholder="Confirm password"
                            name="confirmPassword"
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <FormErrorMessage className="register-form__error" message={errors.confirmPassword} />
                        )}
                    </div>
                    <ActionButton
                        className="register-form__btn"
                        disabled={isSubmitting}
                        type="submit"
                        colorType="success"
                    >
                        Register
                    </ActionButton>
                </form>
            )}
        </Formik>
    );
};

export default RegisterForm;
