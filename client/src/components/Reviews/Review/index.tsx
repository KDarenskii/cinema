import React from "react";
import { IReview } from "../../../models/review";
import cn from "classnames";
import ReviewLike from "./ReviewLike";
import ReviewDislike from "./ReviewDislike";
import ReviewDeleteButton from "./ReviewDeleteButton";

import "./styles.scss";
import AccessCheck from "../../AccessCheck";
import { USER_ROLES } from "../../../constants/userRoles";

const Review: React.FC<IReview> = (review) => {
    const [isFull, setIsFull] = React.useState(false);

    const textRef = React.useRef<HTMLDivElement | null>(null);

    return (
        <article className={cn("review", `review--${review.type}`)}>
            <h4 className="review__title">{review.title}</h4>
            <div className={cn("review__content", { "review__content--full": isFull })}>
                <p className="review__text" ref={textRef}>
                    {review.text}
                </p>
            </div>
            {textRef.current && textRef.current?.offsetHeight > 97 && (
                <button className="review__view-btn" onClick={() => setIsFull((prev) => !prev)}>
                    {isFull ? "Show less" : "Show full review"}
                </button>
            )}
            <div className="review__actions">
                <AccessCheck roles={[USER_ROLES.ADMIN]}>
                    <ReviewDeleteButton id={review.id} />
                </AccessCheck>
                <div className="review__actions-wrapper">
                    <ReviewLike {...review} />
                    <ReviewDislike {...review} />
                </div>
            </div>
        </article>
    );
};

export default Review;
