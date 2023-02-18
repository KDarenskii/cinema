import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/routesPathnames";

import "./styles.scss";

const UnauthorizedPage: React.FC = () => {
    return (
        <div className="unauthorized-page">
            <header className="unauthorized-page__header">
                <h2 className="unauthorized-page__title">Whoops!</h2>
                <FontAwesomeIcon className="unauthorized-page__icon" icon="lock" />
                <p className="unauthorized-page__subtitle">You do not have permission to access this page</p>
            </header>
            <p className="unauthorized-page__text">
                Want to visit{" "}
                <Link className="unauthorized-page__link" to={HOME_ROUTE}>
                    home page
                </Link>
                ?
            </p>
        </div>
    );
};

export default UnauthorizedPage;
