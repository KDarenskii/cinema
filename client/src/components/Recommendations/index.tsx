import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { ITrailer } from "../../models/cinema";
import TrailerService from "../../services/TrailerService";
import CircleLoader from "../CircleLoader";
import EndListMessage from "../EndListMessage";
import Preview from "../Preview";
import PreviewLoader from "../Preview/PreviewLoader";
import PreviewsWrapper from "../PreviewsWrapper";
import RetryError from "../RetryError";
import SectionTitle from "../SectionTitle";

import "./styles.scss";

const Recommendations: React.FC = () => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [list, setList] = React.useState<ITrailer[]>([]);

    const [page, setPage] = React.useState(1);
    const [totalCount, setTotalCount] = React.useState(0);

    const [searchParams] = useSearchParams();

    React.useEffect(() => {
        setPage(1);
        setList([]);
    }, [searchParams]);

    const isSearching = searchParams.toString().length > 0;

    const fetchRecommendations = React.useCallback(
        async (page: number) => {
            setError(null);
            setIsLoading(true);
            try {
                const response = await TrailerService.fetchTrailers({
                    params: {
                        q: searchParams.get("q"),
                        _page: page,
                        _limit: 12,
                    },
                });
                setTotalCount(Number(response.headers["x-total-count"]));
                setList((prev) => [...prev, ...response.data]);
            } catch (error) {
                const err = error as any;
                setError(err.message ?? null);
            } finally {
                setIsLoading(false);
            }
        },
        [searchParams]
    );

    React.useEffect(() => {
        fetchRecommendations(page);
    }, [fetchRecommendations, searchParams, page]);

    return (
        <section className="recommendations">
            <SectionTitle
                className="recommendations__title"
                text={
                    isSearching
                        ? `Found ${!isLoading ? list.length : ""} results for '${searchParams.get("q")}'`
                        : "Recommended for you"
                }
            />
            {!error && (
                <InfiniteScroll
                    next={() => setPage((prev) => prev + 1)}
                    dataLength={list.length}
                    hasMore={list.length < totalCount}
                    loader={<CircleLoader />}
                    className="movies-page__scroll"
                    style={{ overflow: "initial" }}
                    endMessage={
                        <EndListMessage
                            className="recommendations__list-message"
                            message="There is no more content to show you ^_^"
                        />
                    }
                >
                    <PreviewsWrapper>
                        {list.map((preview) => (
                            <Preview key={preview.id} preview={preview} />
                        ))}
                        {isLoading && [...new Array(12)].map((item, index) => <PreviewLoader key={index} />)}
                    </PreviewsWrapper>
                </InfiniteScroll>
            )}
            {error && <RetryError message={error} onClick={() => fetchRecommendations(page)} />}
        </section>
    );
};

export default Recommendations;