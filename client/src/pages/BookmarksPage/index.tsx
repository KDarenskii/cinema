import React from "react";
import Alert from "../../components/Alert";
import Preview from "../../components/Preview";
import PreviewLoader from "../../components/Preview/PreviewLoader";
import PreviewsWrapper from "../../components/PreviewsWrapper";
import RetryError from "../../components/RetryError";
import SectionTitle from "../../components/SectionTitle";
import { ALERT } from "../../constants/alertTypes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectBookmarks } from "../../store/bookmarks/selectors";
import { fetchBookmarks } from "../../store/bookmarks/thunks/fetchBookmarks";

import "./styles.scss";

const BookmarksPage: React.FC = () => {
    
    const { isLoading, error, bookmarks } = useAppSelector(selectBookmarks);
    const dispatch = useAppDispatch();

    return (
        <div className="bookmarks-page">
            <section className="bookmarks-page__movies">
                <SectionTitle className="bookmarks-page__title" text="Bookmarked Movies" />
                {error && <RetryError message={error} onClick={() => dispatch(fetchBookmarks())} />}
                {bookmarks.movies.length < 1 && (
                    <Alert type={ALERT.INFO} message={"You have't bookmarked any movie yet"} />
                )}
                <PreviewsWrapper>
                    {isLoading && [...new Array(12)].map((item, index) => <PreviewLoader key={index} />)}
                    {!error &&
                        !isLoading &&
                        bookmarks.movies.map((preview) => <Preview key={preview.id} preview={preview} />)}
                </PreviewsWrapper>
            </section>
            <section className="bookmarks-page__serials">
                <SectionTitle className="bookmarks-page__title" text="Bookmarked TV Series" />
                {error && <RetryError message={error} onClick={() => dispatch(fetchBookmarks())} />}
                {bookmarks.serials.length < 1 && (
                    <Alert type={ALERT.INFO} message={"You have't bookmarked any TV serial yet"} />
                )}
                <PreviewsWrapper>
                    {isLoading && [...new Array(12)].map((item, index) => <PreviewLoader key={index} />)}
                    {!error &&
                        !isLoading &&
                        bookmarks.serials.map((preview) => <Preview key={preview.id} preview={preview} />)}
                </PreviewsWrapper>
            </section>
        </div>
    );
};

export default BookmarksPage;
