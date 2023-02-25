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
            <MenuLink to={HOME_ROUTE} icon={"home"} label="Home page" />
            <MenuLink to={MOVIES_ROUTE} icon={"film"} label="Movies page" />
            <MenuLink to={SERIALS_ROUTE} icon={"tv"} label="Serials page" />
            <MenuLink to={BOOKMARKS_ROUTE} icon={"bookmark"} label="Bookmarks page" />      
        </nav>
    );
};

export default Menu;
