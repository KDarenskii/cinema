import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./styles.scss";

type Props = {
    icon: IconProp;
}

const MenuLink: React.FC<Props> = ({ icon }) => {
    return (
        <Link className="menu-link" to={""}>
            <FontAwesomeIcon className="menu-link__icon" icon={icon} />
        </Link>
    );
};

export default MenuLink;
