import React from "react";
import cn from "classnames";
import MenuLink from "./MenuLink";

import "./styles.scss";

type Props = {
    className?: string;
};

const Menu: React.FC<Props> = ({ className }) => {
    return (
        <nav className={cn("menu", className)}>
            <MenuLink icon={"home"} />
            <MenuLink icon={"film"} />
            <MenuLink icon={"tv"} />
            <MenuLink icon={"bookmark"} />      
        </nav>
    );
};

export default Menu;
