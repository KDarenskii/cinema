import { selectBookmarks, selectBookmarkById } from ".";
import { BookmarkState } from "../bookmarksSlice";
import { RootState } from "../..";
import { ITrailer } from "../../../models/cinema";
import { CINEMA_TYPE } from "../../../constants/cinemaType";

describe("Bookmarks selectors", () => {
    test("Select bookmarks with empty list", () => {
        const bookmarks: BookmarkState = {
            isLoading: false,
            error: null,
            list: [],
        };

        const result = selectBookmarks({ bookmarks } as RootState);

        expect(result).toEqual({
            bookmarks: {
                movies: [] as ITrailer[],
                serials: [] as ITrailer[],
            },
            isLoading: false,
            error: null,
        });
    });

    test("Select bookmarks with filled list", () => {
        const bookmarks: BookmarkState = {
            isLoading: true,
            error: "Something went wrong",
            list: [
                {
                    imageSrc:
                        "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/9c918339-f643-4663-a716-4655c121a674/1920x",
                    title: "Forrest Gump",
                    type: CINEMA_TYPE.MOVIE,
                    age: 16,
                    year: "1994",
                    duration: 2,
                    id: "1",
                },
                {
                    imageSrc:
                        "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/499746a9-8600-4036-828b-30c4cc2e7a7b/x178",
                    title: "The Green Mile",
                    type: CINEMA_TYPE.MOVIE,
                    age: 16,
                    year: "1999",
                    duration: 1,
                    id: "2",
                },
                {
                    imageSrc:
                        "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/c99b3794-5cb9-4299-a061-37f02af3c1b2/x178",
                    title: "Breaking Bad",
                    type: CINEMA_TYPE.SERIAL,
                    age: 18,
                    year: "2008-2013",
                    duration: 2,
                    id: "3",
                },
            ],
        };

        const result = selectBookmarks({ bookmarks } as RootState);

        expect(result).toEqual({
            bookmarks: {
                movies: [
                    {
                        imageSrc:
                            "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/9c918339-f643-4663-a716-4655c121a674/1920x",
                        title: "Forrest Gump",
                        type: CINEMA_TYPE.MOVIE,
                        age: 16,
                        year: "1994",
                        duration: 2,
                        id: "1",
                    },
                    {
                        imageSrc:
                            "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/499746a9-8600-4036-828b-30c4cc2e7a7b/x178",
                        title: "The Green Mile",
                        type: CINEMA_TYPE.MOVIE,
                        age: 16,
                        year: "1999",
                        duration: 1,
                        id: "2",
                    },
                ] as ITrailer[],
                serials: [
                    {
                        imageSrc:
                            "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/c99b3794-5cb9-4299-a061-37f02af3c1b2/x178",
                        title: "Breaking Bad",
                        type: CINEMA_TYPE.SERIAL,
                        age: 18,
                        year: "2008-2013",
                        duration: 2,
                        id: "3",
                    },
                ] as ITrailer[],
            },
            isLoading: true,
            error: "Something went wrong",
        });
    });

    test("Select bookmark by id with emty list", () => {
        const bookmarks: BookmarkState = {
            list: [],
            isLoading: false,
            error: null,
        };

        const result = selectBookmarkById({ bookmarks } as RootState, "1");

        expect(result).toBe(false);
    });

    test("Select bookmark by id with filled list", () => {
        const bookmark = {
            imageSrc:
                "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/9c918339-f643-4663-a716-4655c121a674/1920x",
            title: "Forrest Gump",
            type: CINEMA_TYPE.MOVIE,
            age: 16,
            year: "1994",
            duration: 2,
            id: "1",
        };
        const bookmarks: BookmarkState = {
            list: [bookmark],
            isLoading: false,
            error: null,
        };
        const result = selectBookmarkById({ bookmarks } as RootState, "1");

        expect(result).toEqual(bookmark);
    });
});
