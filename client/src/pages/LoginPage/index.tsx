import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { REGISTER_ROUTE } from "../../constants/routesPathnames";

import "./styles.scss";

const LoginPage: React.FC = () => {
    return (
        <div className="login">
            <div className="login__body">
                <h3 className="login__title">Log in</h3>
                <LoginForm />
                <p className="register__text">
                    Don't have an account?{" "}
                    <Link className="register__link" to={REGISTER_ROUTE}>
                        Register
                    </Link>
                </p>
                <div style={{ marginTop: 15 }}>
                    <div>Test account</div>
                    <p>Email: admin@mail.com</p>
                    <p>Password: admin</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
