import React from "react";
import { IReview } from "../../../models/review";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButton from "../../ActionButton";

import "./styles.scss";

const Review: React.FC<IReview> = (review) => {

    const { title, text, type } = review;

    const [isFull, setIsFull] = React.useState(false);

    const isActive = true;

    return (
        <article className={cn('review', `review--${type}`)}>
            <h4 className="review__title">{title}</h4>
            <div className={cn("review__content", { "review__content--full": isFull })}>
                <p className="review__text">{text}</p>
            </div>
            <button className="review__view-btn" onClick={() => setIsFull((prev) => !prev)}>
                {isFull ? "Show less" : "Show full review"}
            </button>
            <div className="review__actions">
                <ActionButton className="review__actions-btn" colorType="success" isActive={true}>
                    <FontAwesomeIcon className="review__actions-icon" icon={[`${isActive ? "fas" : "far"}`, "thumbs-up"]} />
                    <span className="review__actions-text">Helpfull</span>
                    <span className="review__actions-amount">1679</span>
                </ActionButton>
                <ActionButton className="review__actions-btn" colorType="error" isActive={false}>
                    <FontAwesomeIcon className="review__actions-icon" icon={["far", "thumbs-down"]} />
                    <span className="review__actions-text">Not</span>
                    <span className="review__actions-amount">504</span>
                </ActionButton>
            </div>

        </article>
    );
};

export default Review;