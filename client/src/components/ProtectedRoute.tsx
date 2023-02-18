import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, UNAUTHORIZED_ROUTE } from "../constants/routesPathnames";
import { useUser } from "../hooks/useUser";

type Props = {
    roles: number[];
};

const ProtectedRoute: React.FC<Props> = ({ roles }) => {
    const { isAuth, user } = useUser();
    const isAllowedRole = Boolean(user?.roles?.find((role) => roles.includes(role)));
    const location  = useLocation();

    if (isAuth && isAllowedRole) return <Outlet />
    else if (isAuth) return <Navigate to={UNAUTHORIZED_ROUTE} state={{ from: location }} replace />;
    else return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />;
};

export default ProtectedRoute;
