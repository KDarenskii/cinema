import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setList } from "../../store/reviews/reviewsSlice";
import { selectReviews } from "../../store/reviews/selectors";
import { fetchReviews } from "../../store/reviews/thunks/fetchReviews";
import CircleLoader from "../CircleLoader";
import EndListMessage from "../EndListMessage";
import RetryError from "../RetryError";
import Review from "./Review";
import ReviewLoader from "./ReviewLoader";

type Props = {
    id: string;
};

const ReviewsList: React.FC<Props> = React.memo(({ id }) => {
    const [page, setPage] = React.useState(1);

    const [searchParams] = useSearchParams();
    const { isLoading, error, list, totalCount } = useAppSelector(selectReviews);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        setPage(1);
        dispatch(setList([]));
    }, [searchParams, dispatch]);

    React.useEffect(() => {
        dispatch(fetchReviews({ cinemaId: id, type: searchParams.get("type"), page }));
    }, [dispatch, id, searchParams, page]);

    return (
        <InfiniteScroll
            next={() => setPage((prev) => prev + 1)}
            dataLength={list.length}
            hasMore={list.length < totalCount}
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
            {error && <RetryError message={error} onClick={() => dispatch(fetchReviews({ cinemaId: id, page }))} />}
        </InfiniteScroll>
    );
});

export default ReviewsList;