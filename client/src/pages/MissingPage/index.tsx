import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/routesPathnames";

import "./styles.scss";

const MissingPage: React.FC = () => {
    return (
        <section className="missing">
            <header className="missing__header">
                <h2 className="missing__title">Whoops!</h2>
                <p className="missing__subtitle">404 Page is not found</p>
            </header>
            <FontAwesomeIcon className="missing__icon" icon="frown-open" />
            <p className="missing__text">
                Want to visit{" "}
                <Link className="missing__link" to={HOME_ROUTE}>
                    home page
                </Link>
                ?
            </p>
        </section>
    );
};

export default MissingPage;