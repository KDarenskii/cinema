import React from "react";
import { ALERT } from "../../constants/alertTypes";
import Alert from "../Alert";
import LightButton from "../LightButton";

import "./styles.scss";

type Props = {
    message: string;
    onClick: () => void;
};

const RetryError: React.FC<Props> = ({ message, onClick }) => {
    return (
        <div className="retry-error" data-testid="retry-error">
            <Alert type={ALERT.ERROR} message={message} />
            <LightButton className="retry-error__btn" onClick={onClick}>Retry</LightButton>
        </div>
    );
};

export default RetryError;
