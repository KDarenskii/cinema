import React from "react";
import cn from "classnames";

import "./styles.scss";

type Props = {
    title: string;
    children: React.ReactNode;
    className?: string;
};

const DescriptionList: React.FC<Props> = ({ title, children, className }) => {
    return (
        <div className={cn("description-list", className)}>
            <h5 className="description-list__title">{title}</h5>
            <ul className="description-list__list">{children}</ul>
        </div>
    );
};

export default DescriptionList;
