import React from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../api";
import Preview from "../../components/Preview";
import PreviewLoader from "../../components/Preview/PreviewLoader";
import PreviewsWrapper from "../../components/PreviewsWrapper";
import RetryError from "../../components/RetryError";
import Search from "../../components/Search";
import SectionTitle from "../../components/SectionTitle";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import InfiniteScroll from "react-infinite-scroll-component";
import EndListMessage from "../../components/EndListMessage";
import CircleLoader from "../../components/CircleLoader";
import { ITrailer } from "../../models/cinema";

import "./styles.scss";

const MoviesPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [list, setList] = React.useState<ITrailer[]>([]);

    const [page, setPage] = React.useState(1);
    const [totalCount, setTotalCount] = React.useState(0);

    const [searchParams] = useSearchParams();
    const isSearching = searchParams.toString().length > 0;

    React.useEffect(() => {
        setPage(1);
        setList([]);
    }, [searchParams]);

    const fetchMovies = React.useCallback(
        async (page: number) => {
            setError(null);
            setIsLoading(true);
            try {
                const response = await api.get<ITrailer[]>("trailers", {
                    params: {
                        type: CINEMA_TYPE.MOVIE,
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
        fetchMovies(page);
    }, [fetchMovies, searchParams, page]);

    return (
        <div className="movies-page">
            <Search className="movies-page__search" />
            <section className="movies-page__list">
                <SectionTitle
                    className="movies-page__title"
                    text={
                        isSearching
                            ? `Found ${!isLoading ? list.length : ""} results for '${searchParams.get("q")}'`
                            : "Movies"
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
                                className="movies-page__list-message"
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
                {error && <RetryError message={error} onClick={() => fetchMovies(page)} />}
            </section>
        </div>
    );
};

export default MoviesPage;