import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import EndListMessage from "../../components/EndListMessage";
import Preview from "../../components/Preview";
import PreviewLoader from "../../components/Preview/PreviewLoader";
import PreviewsWrapper from "../../components/PreviewsWrapper";
import RetryError from "../../components/RetryError";
import Search from "../../components/Search";
import SectionTitle from "../../components/SectionTitle";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import { ITrailer } from "../../models/cinema";
import TrailerService from "../../services/TrailerService";

import "./styles.scss";

const SerialsPage: React.FC = () => {
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

    const fetchSerials = React.useCallback(
        async (page: number) => {
            setError(null);
            setIsLoading(true);
            try {
                const response = await TrailerService.fetchTrailers({
                    params: {
                        type: CINEMA_TYPE.SERIAL,
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
        fetchSerials(page);
    }, [fetchSerials, searchParams, page]);

    return (
        <div className="serials-page">
            <Search className="serials-page__search" />
            <section className="serials-page__list">
                <SectionTitle
                    className="serials-page__title"
                    text={
                        isSearching
                            ? `Found ${!isLoading ? list.length : ""} results for '${searchParams.get("q")}'`
                            : "TV Series"
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
                                className="serials-page__list-message"
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
                {error && <RetryError message={error} onClick={() => fetchSerials(page)} />}
            </section>
        </div>
    );
};

export default SerialsPage;
