import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { IReview } from "../../../../models/review";
import { putReview } from "../../../../store/reviews/thunks/putReview";
import ActionButton from "../../../ActionButton";

import "./styles.scss";

const ReviewLike: React.FC<IReview> = (review) => {

    const dispatch = useAppDispatch();

    const handleClick = () => {

        const updatedReview = {
            ...review,
            isLiked: !review.isLiked,
            likesAmount: review.isLiked ? review.likesAmount - 1 : review.likesAmount + 1,
            isDisliked: false,
            dislikesAmount: review.isDisliked ? review.dislikesAmount - 1 : review.dislikesAmount
        }

        dispatch(putReview(updatedReview));
    };

    return (
        <ActionButton className="review-like" onClick={handleClick} colorType="success" isActive={review.isLiked}>
            <FontAwesomeIcon className="review-like__icon" icon={[`${review.isLiked ? "fas" : "far"}`, "thumbs-up"]} />
            <span className="review-like__text">Helpfull</span>
            <span className="review-like__amount">{review.likesAmount}</span>
        </ActionButton>
    );
};

export default ReviewLike;