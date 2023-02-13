import React from "react";
import cn from "classnames";

import "./styles.scss";

type Props = {
    message: string;
    className?: string;
};

const EndListMessage: React.FC<Props> = ({ message, className }) => {
    return <div className={cn("end-list-message", className)}>{message}</div>;
};

export default EndListMessage;
