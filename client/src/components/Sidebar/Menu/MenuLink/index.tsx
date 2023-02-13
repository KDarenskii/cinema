import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import cn from "classnames";

import "./styles.scss";

type Props = {
    icon: IconProp;
    to: string;
};

const MenuLink: React.FC<Props> = ({ to, icon }) => {
    
    const location = useLocation();

    const isActive = location.pathname === to;

    return (
        <Link className="menu-link" to={to}>
            <FontAwesomeIcon className={cn("menu-link__icon", { "menu-link__icon--active": isActive })} icon={icon} />
        </Link>
    );
};

export default MenuLink;
