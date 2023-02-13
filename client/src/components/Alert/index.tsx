import React from "react";
import { ALERT } from "../../constants/alertTypes";
import cn from "classnames";

import "./styles.scss";

type Props = {
    message: string;
    type: ALERT;
    className?: string;
};

const Alert: React.FC<Props> = ({ type, message, className }) => {
    return (
        <div className={cn("alert", `alert--${type}`, className)}>{message}</div>
    );
};

export default Alert;
