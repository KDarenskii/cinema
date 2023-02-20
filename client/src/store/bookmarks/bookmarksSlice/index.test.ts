import { Action, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { CINEMA_TYPE } from "../../../constants/cinemaType";
import { ITrailer } from "../../../models/cinema";
import { deleteBookmark } from "../thunks/deleteBookmark";
import { fetchBookmarks } from "../thunks/fetchBookmarks";
import { postBookmark } from "../thunks/postBookmark";
import reducer, { BookmarkState } from "./index";

describe("Bookmarks slice", () => {
    let initialState: BookmarkState;

    beforeEach(() => {
        initialState = {
            isLoading: false,
            error: null,
            list: [],
        };
    });

    test("should return the initial state", () => {
        expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });

    describe("fetchBookmarks action with extraReducers", () => {
        test("should change loading status with 'fetchBookmarks.pending' action", () => {
            const action: Action = { type: fetchBookmarks.pending.type };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                isLoading: true,
                error: null,
            });
        });

        test("should set bookmarks list with 'fetchBookmarks.fulfilled' action", () => {
            const mokedBookmarksList: ITrailer[] = [
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
            ];
            const action: PayloadAction<ITrailer[]> = {
                type: fetchBookmarks.fulfilled.type,
                payload: [...mokedBookmarksList],
            };

            expect(reducer(initialState, action)).toEqual({
                isLoading: false,
                error: null,
                list: [...mokedBookmarksList],
            });
        });

        test("should handle error state being changed with 'fetchBookmarks.rejected' action", () => {
            const action: PayloadAction<undefined, string, undefined, SerializedError> = {
                type: fetchBookmarks.rejected.type,
                payload: undefined,
                meta: undefined,
                error: { message: "Some error happend" },
            };

            expect(reducer(initialState, action)).toEqual({ isLoading: false, list: [], error: "Some error happend" });
        });
    });

    describe("postBookmark action with extraReducers", () => {
        test("should handle a new bookmark beeing added with 'postBookmark.fulfilled' action and empty list", () => {
            const mockedBookmark: ITrailer = {
                imageSrc:
                    "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/9c918339-f643-4663-a716-4655c121a674/1920x",
                title: "Forrest Gump",
                type: CINEMA_TYPE.MOVIE,
                age: 16,
                year: "1994",
                duration: 2,
                id: "1",
            };
            const action: PayloadAction<ITrailer> = { type: postBookmark.fulfilled.type, payload: mockedBookmark };

            expect(reducer(initialState, action)).toEqual({ ...initialState, list: [mockedBookmark] });
        });

        test("should handle a new bookmark being added with 'postBookmark.fulfilled' action and filled list", () => {
            const previouseList: ITrailer[] = [
                {
                    imageSrc: "First src",
                    title: "First film",
                    type: CINEMA_TYPE.MOVIE,
                    age: 16,
                    year: "1994",
                    duration: 2,
                    id: "1",
                },
                {
                    imageSrc: "Second src",
                    title: "Second film",
                    type: CINEMA_TYPE.MOVIE,
                    age: 16,
                    year: "2023",
                    duration: 2,
                    id: "8",
                },
            ];

            const state: BookmarkState = { ...initialState, list: [...previouseList] };

            const newBookmark: ITrailer = {
                imageSrc: "New src",
                title: "New film",
                type: CINEMA_TYPE.SERIAL,
                age: 13,
                year: "2000",
                duration: 3,
                id: "2",
            };

            const action: PayloadAction<ITrailer> = { type: postBookmark.fulfilled.type, payload: newBookmark };

            expect(reducer(state, action)).toEqual({ ...initialState, list: [...state.list, newBookmark] });
        });
    });

    describe("deleteBookmark action with extraReducers", () => {
        test("should handle a bookmark being deleted with 'deleteBookmark.fulfilled' action", () => {
            const mockedBookmarksList: ITrailer[] = [
                {
                    imageSrc: "First src",
                    title: "First film",
                    type: CINEMA_TYPE.MOVIE,
                    age: 16,
                    year: "1994",
                    duration: 2,
                    id: "1",
                },
                {
                    imageSrc: "Second src",
                    title: "Second film",
                    type: CINEMA_TYPE.MOVIE,
                    age: 16,
                    year: "1999",
                    duration: 1,
                    id: "2",
                },
            ];

            const state: BookmarkState = { ...initialState, list: [...mockedBookmarksList] };

            const action: PayloadAction<string> = { type: deleteBookmark.fulfilled.type, payload: "1" };

            expect(reducer(state, action)).toEqual({
                ...state,
                list: [
                    {
                        imageSrc: "Second src",
                        title: "Second film",
                        type: CINEMA_TYPE.MOVIE,
                        age: 16,
                        year: "1999",
                        duration: 1,
                        id: "2",
                    },
                ],
            });
        });
    });
});
