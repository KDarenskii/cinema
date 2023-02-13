import React from "react";

import "./styles.scss";

type Props = {
    title: string;
    children: React.ReactNode;
};

const DescriptionInfo: React.FC<Props> = ({ children, title }) => {
    return (
        <div className="description-info">
            <h4 className="description-info__title">{title}</h4>
            <ul className="description-info__list">{children}</ul>
        </div>
    );
};

export default DescriptionInfo;
