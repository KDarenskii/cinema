import React, { InputHTMLAttributes } from "react";
import cn from "classnames";

import "./styles.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ className, ...rest }) => {
    return <input {...rest} className={cn("input", className)} placeholder={"Search for movies or TV series"} />;
};

export default Input;
