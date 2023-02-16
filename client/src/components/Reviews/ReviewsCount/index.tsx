import React from "react";
import { REVIEW_TYPE } from "../../../constants/reviewTypes";
import cn from "classnames";
import { useSearchParams } from "react-router-dom";

import "./styles.scss";

type Props = {
    text: string;
    type?: REVIEW_TYPE;
};

const ReviewsCount: React.FC<Props> = ({ text, type }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    let isActive;

    if (type) isActive = searchParams.get("type") === type;
    else isActive = !searchParams.has("type");

    const handleClick = () => {
        if (type) searchParams.set("type", type);
        else searchParams.delete("type");
        setSearchParams(searchParams);
    };

    return (
        <div
            className={cn("reviews-count", { "reviews-count--active": isActive }, type ? `reviews-count--${type}` : "")}
            onClick={handleClick}
        >
            {text}
        </div>
    );
};

export default ReviewsCount;
