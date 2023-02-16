import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm";
import { LOGIN_ROUTE } from "../../constants/routesPathnames";

import "./styles.scss";

const RegisterPage: React.FC = () => {

    return (
        <div className="register">
            <div className="register__body">
                <h3 className="register__title">Registration</h3>
                <RegisterForm />
                <p className="register__text">
                    Already have an account?{" "}
                    <Link className="register__link" to={LOGIN_ROUTE}>
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
