import React from "react";
import cn from "classnames";

import "./styles.scss";

type Props = React.InputHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<Props> = ({ className, children, ...rest }) => {
    return <select {...rest} className={cn("select", className)}>{children}</select>;
};

export default Select;
