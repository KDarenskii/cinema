import React from "react";
import cn from "classnames";

import "./styles.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    colorType: "success" | "error";
    isActive?: boolean;
}

const ActionButton: React.FC<Props> = ({ colorType, isActive, className, children, ...rest }) => {
    return (
        <button
            {...rest}
            className={cn("action-button", `action-button--${colorType}${isActive ? "--active" : ""}`, className)}
        >
            {children}
        </button>
    );
};

export default ActionButton;
