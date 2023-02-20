import { RootState } from "../..";
import { CINEMA_TYPE } from "../../../constants/cinemaType";

export const selectBookmarks = (state: RootState) => {
    return {
        bookmarks: {
            movies: state.bookmarks.list.filter((bookmark) => bookmark.type === CINEMA_TYPE.MOVIE),
            serials: state.bookmarks.list.filter((bookmark) => bookmark.type === CINEMA_TYPE.SERIAL),
        },
        isLoading: state.bookmarks.isLoading,
        error: state.bookmarks.error,
    };
};
export const selectBookmarkById = (state: RootState, id: string) =>
    state.bookmarks.list.find((bookmark) => bookmark.id === id) ?? false;
