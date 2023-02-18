import React from "react";
import { useUser } from "../hooks/useUser";

type Props = {
    children: React.ReactNode;
    roles: number[];
};

const AccessCheck: React.FC<Props> = ({ children, roles }) => {
    const { isAuth, user } = useUser();
    const isAllowedRole = Boolean(user?.roles?.find((role) => roles.includes(role)));

    return <>{isAuth && isAllowedRole ? children : null}</>;
};

export default AccessCheck;
