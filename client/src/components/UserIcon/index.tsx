import React from "react";
import cn from "classnames";
import MenuLink from "../Sidebar/Menu/MenuLink";
import { useUser } from "../../hooks/useUser";
import { LOGIN_ROUTE } from "../../constants/routesPathnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logoutUser } from "../../store/user/userSlice";
import { showNotion } from "../../utils/showNotion";
import { NOTION } from "../../constants/notion";

import "./styles.scss";

type Props = {
    className?: string;
};

const UserIcon: React.FC<Props> = ({ className }) => {
    const { isAuth } = useUser();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logoutUser());
        showNotion(NOTION.SUCCESS, "Logged out");
    };

    return (
        <div className={cn("user-icon", className)}>
            {isAuth ? (
                <FontAwesomeIcon onClick={handleLogout} icon="sign-out-alt" />
            ) : (
                <MenuLink to={LOGIN_ROUTE} icon={"user"} />
            )}
        </div>
    );
};

export default UserIcon;
