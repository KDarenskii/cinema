import React from "react";
import cn from "classnames";

import "./styles.scss";

type Props = {
    className?: string;
    text: string;
};

const SectionTitle: React.FC<Props> = ({ text, className }) => {
    return <h2 className={cn("section-title", className)}>{text}</h2>;
};

export default SectionTitle;
