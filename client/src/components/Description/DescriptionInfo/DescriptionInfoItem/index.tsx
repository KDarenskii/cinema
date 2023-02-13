import React from "react";

import "./styles.scss";

type Props = {
    name: string;
    value: string | string[];
};

const DescriptionInfoItem: React.FC<Props> = ({ name, value }) => {
    return (
        <li className="description-item">
            <div className="description-item__name">{name}</div>
            <div className="description-item__values-wrapper">
                {Array.isArray(value) ? (
                    value.map((item, index) => (
                        <span className="description-item__value" key={index}>
                            {item}
                        </span>
                    ))
                ) : (
                    <span className="description-item__value">{value}</span>
                )}
            </div>
        </li>
    );
};

export default DescriptionInfoItem;
