import React from "react";
import cn from "classnames";

import "./styles.scss";

type Props = {
    message: string;
    className?: string;
};

const FormErrorMessage: React.FC<Props> = ({ message, className }) => {
    return <p className={cn("form-error-message", className)}>{message}</p>;
};

export default FormErrorMessage;
