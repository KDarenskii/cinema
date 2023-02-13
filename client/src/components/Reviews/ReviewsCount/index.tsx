import React from "react";
import { REVIEW_TYPE } from "../../../constants/reviewTypes";
import cn from "classnames";

import "./styles.scss";
import { useSearchParams } from "react-router-dom";

type Props = {
    text: string;
    amount: number;
    percents?: number;
    type?: REVIEW_TYPE;
};

const ReviewsCount: React.FC<Props> = ({ text, amount, percents, type }) => {
    
    const [searchParams, setSearchParams] = useSearchParams();

    const isActive = type ? searchParams.get("type") === type : true;

    const handleClick = () => {
        if (type) searchParams.set("type", type);
        else searchParams.delete("type");
        setSearchParams(searchParams);
    }

    return (
        <div className={cn("reviews-count", { "reviews-count--active": isActive })} onClick={handleClick}>
            <div className="reviews-count__wrapper">
                <div className={cn("reviews-count__amount", type && `reviews-count__amount--${type}`)}>{amount}</div>
                <div className="reviews-count__percents">
                    {percents}
                    {type && "%"}
                </div>
            </div>
            <div className="reviews-count__type">{text}</div>
        </div>
    );
};

export default ReviewsCount;
