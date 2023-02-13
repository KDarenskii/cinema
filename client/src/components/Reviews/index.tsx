import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { REVIEW_TYPE, REVIEW_TYPE_VALUE } from "../../constants/reviewTypes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectReviews } from "../../store/reviews/selectors";
import { fetchReviews } from "../../store/reviews/thunks/fetchReviews";
import LightButton from "../LightButton";
import Review from "./Review";
import ReviewLoader from "./ReviewLoader";
import ReviewsCount from "./ReviewsCount";

import "./styles.scss";

const Reviews: React.FC = () => {

    const { id = "" } = useParams();

    const [searchParams] = useSearchParams();
    const { isLoading, error, list } = useAppSelector(selectReviews);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchReviews({ cinemaId: id, type: searchParams.get("type") }));
    }, [dispatch, id, searchParams]);

    return (
        <section className="reviews">
            <h3 className="reviews__title">Audience reviews</h3>
            <LightButton className="reviews__btn"> + Write review</LightButton>
            <div className="reviews__content">
                <div className="reviews__wrapper">
                    {!isLoading && !error && list.map((review) => <Review {...review} key={review.id} />)}
                </div>
                <div className="reviews__info">
                    <ReviewsCount amount={101} text="Total" />
                    <ReviewsCount amount={42} percents={41.58} text={REVIEW_TYPE_VALUE.positive} type={REVIEW_TYPE.POSITIVE} />
                    <ReviewsCount amount={32} percents={31.68} text={REVIEW_TYPE_VALUE.negative} type={REVIEW_TYPE.NEGATIVE} />
                    <ReviewsCount amount={27} percents={26.73} text={REVIEW_TYPE_VALUE.neutral} type={REVIEW_TYPE.NEUTRAL} />
                </div>
            </div>
        </section>
    );
};

export default Reviews;