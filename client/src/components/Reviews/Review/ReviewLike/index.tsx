import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NOTION } from "../../../../constants/notion";
import { LOGIN_ROUTE } from "../../../../constants/routesPathnames";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useFromNavigate } from "../../../../hooks/useFromNavigate";
import { IReview } from "../../../../models/review";
import { putReview } from "../../../../store/reviews/thunks/putReview";
import { showNotion } from "../../../../utils/showNotion";
import ActionButton from "../../../ActionButton";

import "./styles.scss";

const ReviewLike: React.FC<IReview> = (review) => {
    const dispatch = useAppDispatch();
    const navigateFrom = useFromNavigate();

    const handleClick = async () => {
        const updatedReview = {
            ...review,
            isLiked: !review.isLiked,
            likesAmount: review.isLiked ? review.likesAmount - 1 : review.likesAmount + 1,
            isDisliked: false,
            dislikesAmount: review.isDisliked ? review.dislikesAmount - 1 : review.dislikesAmount,
        };

        try {
            await dispatch(putReview(updatedReview)).unwrap();
        } catch (error) {
            const err = error as any;
            if (err.isAuthError) {
                navigateFrom(LOGIN_ROUTE);
            } else {
                showNotion(NOTION.ERROR, err.message);
            }
        }
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
