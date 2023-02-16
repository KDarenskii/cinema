import React, { InputHTMLAttributes } from "react";
import cn from "classnames";

import "./styles.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ className, ...rest }) => {
    return <input {...rest} className={cn("input", className)} />;
};

export default Input;
