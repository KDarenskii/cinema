import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { IReview } from "../../../../models/review";
import { putReview } from "../../../../store/reviews/thunks/putReview";
import ActionButton from "../../../ActionButton";

import "./styles.scss";

const ReviewDislike: React.FC<IReview> = (review) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        const updatedReview = {
            ...review,
            isDisliked: !review.isDisliked,
            dislikesAmount: review.isDisliked ? review.dislikesAmount - 1 : review.dislikesAmount + 1,
            isLiked: false,
            likesAmount: review.isLiked ? review.likesAmount - 1 : review.likesAmount,
        };

        dispatch(putReview(updatedReview));
    };

    return (
        <ActionButton className="review-dislike" onClick={handleClick} colorType="error" isActive={review.isDisliked}>
            <FontAwesomeIcon
                className="review-dislike__icon"
                icon={[`${review.isDisliked ? "fas" : "far"}`, "thumbs-down"]}
            />
            <span className="review-dislike__text">Not</span>
            <span className="review-dislike__amount">{review.dislikesAmount}</span>
        </ActionButton>
    );
};

export default ReviewDislike;
