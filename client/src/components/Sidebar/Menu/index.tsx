import React from "react";
import cn from "classnames";
import MenuLink from "./MenuLink";
import { BOOKMARKS_ROUTE, HOME_ROUTE, MOVIES_ROUTE, SERIALS_ROUTE } from "../../../constants/routesPathnames";

import "./styles.scss";

type Props = {
    className?: string;
};

const Menu: React.FC<Props> = ({ className }) => {
    return (
        <nav className={cn("menu", className)}>
            <MenuLink to={HOME_ROUTE} icon={"home"} />
            <MenuLink to={MOVIES_ROUTE} icon={"film"} />
            <MenuLink to={SERIALS_ROUTE} icon={"tv"} />
            <MenuLink to={BOOKMARKS_ROUTE} icon={"bookmark"} />      
        </nav>
    );
};

export default Menu;
