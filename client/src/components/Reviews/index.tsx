import React from "react";
import { useParams } from "react-router-dom";
import { REVIEW_TYPE, REVIEW_TYPE_VALUE } from "../../constants/reviewTypes";
import ReviewCreation from "./ReviewCreation";
import ReviewsCount from "./ReviewsCount";
import ReviewsList from "./ReviewsList";
import ReviewsWriteButton from "./ReviewsWriteButton";

import "./styles.scss";

const Reviews: React.FC = () => {
    const { id = "" } = useParams();
    const [isCreating, setIsCreating] = React.useState(false);
    return (
        <section className="reviews">
            <h3 className="reviews__title">Audience reviews</h3>
            <ReviewsWriteButton className="reviews__btn" isCreating={isCreating} setIsCreating={setIsCreating} />
            <div className="reviews__content">
                <div className="reviews__inner">
                    {isCreating && (
                        <ReviewCreation className="reviews__creation" setIsCreating={setIsCreating} id={id} />
                    )}
                    <ReviewsList id={id} />
                </div>

                <div className="reviews__info">
                    <ReviewsCount text="All" />
                    <ReviewsCount text={REVIEW_TYPE_VALUE.positive} type={REVIEW_TYPE.POSITIVE} />
                    <ReviewsCount text={REVIEW_TYPE_VALUE.negative} type={REVIEW_TYPE.NEGATIVE} />
                    <ReviewsCount text={REVIEW_TYPE_VALUE.neutral} type={REVIEW_TYPE.NEUTRAL} />
                </div>
            </div>
        </section>
    );
};

export default Reviews;
