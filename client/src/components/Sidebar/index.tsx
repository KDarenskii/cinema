import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HOME_ROUTE } from "../../constants/routesPathnames";
import Menu from "./Menu";
import UserIcon from "../UserIcon";

import "./styles.scss";

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <Link className="sidebar__logo" to={HOME_ROUTE}>
                <FontAwesomeIcon className="sidebar__logo-icon" icon={"video"} />
            </Link>
            <Menu className="sidebar__menu" />
            <UserIcon className="sidebar__user-icon" />
        </aside>
    );
};

export default Sidebar;
