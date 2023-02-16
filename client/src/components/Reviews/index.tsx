import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams, useSearchParams } from "react-router-dom";
import { REVIEW_TYPE, REVIEW_TYPE_VALUE } from "../../constants/reviewTypes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setList } from "../../store/reviews/reviewsSlice";
import { selectReviews } from "../../store/reviews/selectors";
import { fetchReviews } from "../../store/reviews/thunks/fetchReviews";
import CircleLoader from "../CircleLoader";
import EndListMessage from "../EndListMessage";
import LightButton from "../LightButton";
import RetryError from "../RetryError";
import Review from "./Review";
import ReviewCreation from "./ReviewCreation";
import ReviewLoader from "./ReviewLoader";
import ReviewsCount from "./ReviewsCount";

import "./styles.scss";

const Reviews: React.FC = () => {
    const [isCreating, setIsCreating] = React.useState(false);

    const { id = "" } = useParams();
    const [page, setPage] = React.useState(1);

    const [searchParams] = useSearchParams();
    const { isLoading, error, list, amounts } = useAppSelector(selectReviews);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        setPage(1);
        dispatch(setList([]));
    }, [searchParams, dispatch]);

    React.useEffect(() => {
        dispatch(fetchReviews({ cinemaId: id, type: searchParams.get("type"), page }));
    }, [dispatch, id, searchParams, page]);

    return (
        <section className="reviews">
            <h3 className="reviews__title">Audience reviews</h3>
            {!isCreating && (
                <LightButton className="reviews__btn" onClick={() => setIsCreating(true)}>
                    {" "}
                    + Write review
                </LightButton>
            )}
            <div className="reviews__content">
                <div className="reviews__inner">
                    {isCreating && (
                        <ReviewCreation className="reviews__creation" setIsCreating={setIsCreating} id={id} />
                    )}
                    <InfiniteScroll
                        next={() => setPage((prev) => prev + 1)}
                        dataLength={list.length}
                        hasMore={list.length < amounts.total}
                        loader={isLoading && <CircleLoader />}
                        style={{ overflow: "initial" }}
                        endMessage={
                            <EndListMessage
                                className="movies-page__list-message"
                                message="There is no more content to show you ^_^"
                            />
                        }
                    >
                        <div className="reviews__wrapper">
                            {list.map((review) => (
                                <Review {...review} key={review.id} />
                            ))}
                            {isLoading && [...new Array(3)].map((item, index) => <ReviewLoader key={index} />)}
                        </div>
                        {error && (
                            <RetryError message={error} onClick={() => dispatch(fetchReviews({ cinemaId: id, page }))} />
                        )}
                    </InfiniteScroll>
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
