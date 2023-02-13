import React from "react";
import cn from "classnames";

import "./styles.scss";

type Props = {
    title: string;
    overview?: string;
    className?: string;
};

const DescriptionHeader: React.FC<Props> = ({ title, overview, className }) => {
    return (
        <header className={cn("description-header", className)}>
            <h1 className="description-header__title">{title}</h1>
            {overview && <p className="description-header__overview">{overview}</p>}
        </header>
    );
};

export default DescriptionHeader;
