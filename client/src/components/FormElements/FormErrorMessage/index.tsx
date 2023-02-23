import React from "react";
import cn from "classnames";

import "./styles.scss";

type Props = {
    message: string;
    id?: string;
    className?: string;
};

const FormErrorMessage: React.FC<Props> = ({ message, className, id }) => {
    return <p className={cn("form-error-message", className)} id={id}>{message}</p>;
};

export default FormErrorMessage;
