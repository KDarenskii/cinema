import { Formik } from "formik";
import React from "react";
import { ALERT } from "../../constants/alertTypes";
import ActionButton from "../ActionButton";
import Alert from "../Alert";
import FormErrorMessage from "../FormElements/FormErrorMessage";
import Input from "../FormElements/Input";
import { registerScheme } from "./registerScheme";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { registerUser } from "../../store/user/thunks/registerUser";
import { USER_ROLES } from "../../constants/userRoles";
import { showNotion } from "../../utils/showNotion";
import { NOTION } from "../../constants/notion";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/routesPathnames";

import "./styles.scss";

interface Values {
    email: string;
    password: string;
    confirmPassword: string;
    nickname: string;
}

const RegisterForm: React.FC = () => {
    const [error, setError] = React.useState<string | null>(null);
    const dispatch = useAppDispatch();

    const location = useLocation();
    const from = location.state?.from?.pathname || HOME_ROUTE;
    const navigate = useNavigate();

    const initialValues: Values = {
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
    };

    const handleSubmit = async (values: Values) => {
        const { email, password, confirmPassword, nickname } = values;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const newUser = {
            email,
            password,
            nickname,
            roles: [USER_ROLES.USER],
            id: nanoid(),
        };

        try {
            const response = await dispatch(registerUser(newUser)).unwrap();
            localStorage.setItem("token", response.accessToken);
            showNotion(NOTION.SUCCESS, "Welcome");
            navigate(from, { replace: true });
        } catch (error) {
            const err = error as any;
            setError(err.message);
        }
    };

    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={registerScheme}>
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
                <form className="register-form" onChange={() => setError(null)} onSubmit={handleSubmit} aria-label="register form">
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
                            aria-label="email"
                            aria-invalid={true}
                            aria-errormessage="register-email-error"
                        />
                        {errors.email && touched.email && (
                            <FormErrorMessage
                                className="register-form__error"
                                message={errors.email}
                                id="register-email-error"
                            />
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
                            aria-label="nickname"
                            aria-invalid={true}
                            aria-errormessage="register-nickname-error"
                        />
                        {errors.nickname && touched.nickname && (
                            <FormErrorMessage
                                className="register-form__error"
                                message={errors.nickname}
                                id="register-nickname-error"
                            />
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
                            aria-label="password"
                            aria-invalid={true}
                            aria-errormessage="register-password-error"
                        />
                        {errors.password && touched.password && (
                            <FormErrorMessage
                                className="register-form__error"
                                message={errors.password}
                                id="register-password-error"
                            />
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
                            aria-label="confirmPassword"
                            aria-invalid={true}
                            aria-errormessage="register-confirmPassword-error"
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <FormErrorMessage
                                className="register-form__error"
                                message={errors.confirmPassword}
                                id="register-confirmPassword-error"
                            />
                        )}
                    </div>
                    <ActionButton
                        className="register-form__btn"
                        disabled={isSubmitting}
                        type="submit"
                        colorType="success"
                    >
                        {isSubmitting ? "Wait" : "Register"}
                    </ActionButton>
                </form>
            )}
        </Formik>
    );
};

export default RegisterForm;
