import React from "react";
import cn from "classnames";
import MenuLink from "../Sidebar/Menu/MenuLink";

import "./styles.scss";

type Props = {
    src?: string;
    className?: string;
};

const UserIcon: React.FC<Props> = ({ src, className }) => {
    
    const [isAuth] = React.useState(false);

    return (
        <div className={cn("user-icon", className)}>
            {isAuth ? <img className="user-icon__img" src={src} alt="User" /> : <MenuLink to={''} icon={"user"} />}
        </div>
    );
};

export default UserIcon;
