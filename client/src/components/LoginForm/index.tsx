import { Formik } from "formik";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ALERT } from "../../constants/alertTypes";
import { NOTION } from "../../constants/notion";
import { HOME_ROUTE } from "../../constants/routesPathnames";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchBookmarks } from "../../store/bookmarks/thunks/fetchBookmarks";
import { loginUser } from "../../store/user/thunks/loginUser";
import { showNotion } from "../../utils/showNotion";
import ActionButton from "../ActionButton";
import Alert from "../Alert";
import FormErrorMessage from "../FormElements/FormErrorMessage";
import Input from "../FormElements/Input";
import { loginScheme } from "./loginScheme";

import "./styles.scss";

interface Values {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [error, setError] = React.useState<string | null>(null);
    const dispatch = useAppDispatch();

    const location = useLocation();
    const from = location.state?.from?.pathname ?? HOME_ROUTE;
    const navigate = useNavigate();

    const initialValues: Values = {
        email: "",
        password: "",
    };

    const handleSubmit = async (values: Values) => {
        try {
            const response = await dispatch(loginUser(values)).unwrap();
            localStorage.setItem("token", response.accessToken);
            dispatch(fetchBookmarks());
            showNotion(NOTION.SUCCESS, "Welcome");
            navigate(from, { replace: true });
        } catch (error) {
            const err = error as any;
            setError(err.message);
        }
    };

    return (
        <Formik
            onSubmit={handleSubmit}
            onChange={() => setError(null)}
            initialValues={initialValues}
            validationSchema={loginScheme}
        >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
                <form
                    className="login-form"
                    onChange={() => setError(null)}
                    onSubmit={handleSubmit}
                    aria-label="login form"
                >
                    {error && <Alert className="login-form__alert" type={ALERT.ERROR} message={error} />}
                    <div className="login-form__item">
                        <Input
                            className="login-form__input"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            type="text"
                            placeholder="Email"
                            name="email"
                            aria-label="email"
                            aria-invalid={true}
                            aria-errormessage="login-email-error"
                        />
                        {errors.email && touched.email && (
                            <FormErrorMessage
                                className="login-form__error"
                                message={errors.email}
                                id="login-email-error"
                            />
                        )}
                    </div>
                    <div className="login-form__item">
                        <Input
                            className="login-form__input"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            type="password"
                            placeholder="Password"
                            name="password"
                            aria-label="password"
                            aria-invalid={true}
                            aria-errormessage="login-password-error"
                        />
                        {errors.password && touched.password && (
                            <FormErrorMessage
                                className="login-form__error"
                                message={errors.password}
                                id="login-password-error"
                            />
                        )}
                    </div>
                    <ActionButton className="login-form__btn" disabled={isSubmitting} type="submit" colorType="success">
                        {isSubmitting ? "Wait" : "Log in"}
                    </ActionButton>
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;
