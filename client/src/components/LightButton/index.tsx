import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";

import "./styles.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const LightButton: React.FC<Props> = ({ children, className, ...rest }) => {
    return (
        <button {...rest} className={cn("light-button", className)}>
            {children}
        </button>
    );
};

export default LightButton;