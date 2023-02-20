import { REVIEW_TYPE } from "../../../constants/reviewTypes";
import { IReview } from "../../../models/review";
import reducer, { setList, ReviewsState } from ".";
import { fetchReviews } from "../thunks/fetchReviews";
import { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { postReview } from "../thunks/postReview";
import { putReview } from "../thunks/putReview";
import { deleteReview } from "../thunks/deleteReview";

describe("Reviews slice", () => {
    let mockedReviewsList: IReview[];
    let initialState: ReviewsState;

    beforeEach(() => {
        mockedReviewsList = [
            {
                type: REVIEW_TYPE.NEUTRAL,
                title: "Review test",
                text: "Review test text",
                cinemaId: "1",
                dislikesAmount: 10,
                isDisliked: true,
                isLiked: false,
                likesAmount: 500,
                id: "1",
                date: "2023-02-15T14:05:22.657Z",
            },
            {
                type: REVIEW_TYPE.POSITIVE,
                title: "Review test",
                text: "Review test text",
                cinemaId: "15",
                dislikesAmount: 82,
                isDisliked: false,
                isLiked: true,
                likesAmount: 11,
                id: "2",
                date: "2023-02-15T14:05:22.657Z",
            },
        ];
        initialState = {
            isLoading: false,
            error: null,
            list: [],
            totalCount: 0,
        };
    });

    test("should return the initial state", () => {
        const initialState: ReviewsState = {
            isLoading: false,
            error: null,
            list: [],
            totalCount: 0,
        };
        expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });

    describe("Reducers", () => {
        test("should set reviews with empty list", () => {
            const initialState: ReviewsState = {
                isLoading: false,
                error: null,
                list: [],
                totalCount: 0,
            };
            expect(reducer(initialState, setList(mockedReviewsList))).toEqual({
                ...initialState,
                list: [...mockedReviewsList],
            });
        });

        test("should set reviews with filled list", () => {
            const initialState: ReviewsState = {
                isLoading: false,
                error: null,
                list: [...mockedReviewsList],
                totalCount: 0,
            };
            const newMockedReviewsList: IReview[] = [
                {
                    type: REVIEW_TYPE.NEUTRAL,
                    title: "New review",
                    text: "New review text",
                    cinemaId: "25",
                    dislikesAmount: 0,
                    isDisliked: false,
                    isLiked: true,
                    likesAmount: 20,
                    id: "J-2K1yWup3kSNAH8HRXmU",
                    date: "2023-02-15T14:05:22.657Z",
                },
                {
                    type: REVIEW_TYPE.NEGATIVE,
                    title: "New review test",
                    text: "New review text",
                    cinemaId: "40",
                    dislikesAmount: 20,
                    isDisliked: false,
                    isLiked: true,
                    likesAmount: 11,
                    id: "J-2K1yWup3kSNAH8HRXmU",
                    date: "2023-02-15T14:05:22.657Z",
                },
            ];
            expect(reducer(initialState, setList([...newMockedReviewsList]))).toEqual({
                ...initialState,
                list: [...newMockedReviewsList],
            });
        });
    });

    describe("fetchReviews action with extraReducers", () => {
        test("should change loading state with 'fetchReviews.pending' action", () => {
            const action: PayloadAction<undefined> = { type: fetchReviews.pending.type, payload: undefined };
            expect(reducer(initialState, action)).toEqual({ ...initialState, isLoading: true });
        });

        test("should add new reviews with 'fetchReviews.fulfilled' action and empty list", () => {
            const mockedTotalCount = 10;

            const action: PayloadAction<{ totalCount: number; reviews: IReview[] }> = {
                type: fetchReviews.fulfilled.type,
                payload: { reviews: mockedReviewsList, totalCount: mockedTotalCount },
            };

            const state: ReviewsState = {
                ...initialState,
                list: mockedReviewsList,
                totalCount: mockedTotalCount,
            };

            expect(reducer(initialState, action)).toEqual(state);
        });

        test("should add new reviews with 'fetchReviews.fulfilled' action and existing list", () => {
            const newReviews: IReview[] = [
                {
                    type: REVIEW_TYPE.NEUTRAL,
                    title: "First review",
                    text: "First review text",
                    cinemaId: "4",
                    dislikesAmount: 1,
                    isDisliked: true,
                    isLiked: false,
                    likesAmount: 4,
                    id: "J-2K1yWup3kSNAH8HRXmU",
                    date: "2023-02-15T14:05:22.657Z",
                },
                {
                    type: REVIEW_TYPE.POSITIVE,
                    title: "Second review",
                    text: "Second review text",
                    cinemaId: "29",
                    dislikesAmount: 48,
                    isDisliked: true,
                    isLiked: true,
                    likesAmount: 5,
                    id: "J-2K1yWup3kSNAH8HRXmU",
                    date: "2023-02-15T14:05:22.657Z",
                },
            ];
            const mockedTotalCount = 10;

            const state: ReviewsState = {
                ...initialState,
                list: mockedReviewsList,
                totalCount: mockedTotalCount,
            };

            const action: PayloadAction<{ totalCount: number; reviews: IReview[] }> = {
                type: fetchReviews.fulfilled.type,
                payload: { reviews: newReviews, totalCount: mockedTotalCount },
            };

            expect(reducer(state, action)).toEqual({
                ...state,
                list: [...state.list, ...newReviews],
                totalCount: mockedTotalCount,
            });
        });

        test("should change error state with 'fetchReviews.rejected' action", () => {
            const action: PayloadAction<undefined, string, undefined, SerializedError> = {
                type: fetchReviews.rejected.type,
                payload: undefined,
                meta: undefined,
                error: { message: "Some error happend" },
            };
            expect(reducer(initialState, action)).toEqual({ ...initialState, error: "Some error happend" });
        });
    });

    describe("postReviews action with extraReducers", () => {
        test("should add new review with 'postReview.fulfilled' action and empty list", () => {
            const newReview: IReview = mockedReviewsList[0];

            const action: PayloadAction<IReview> = { type: postReview.fulfilled.type, payload: newReview };

            expect(reducer(initialState, action)).toEqual({ ...initialState, list: [newReview] });
        });

        test("should add new review with 'postReview.fulfilled' action and existing list", () => {
            const newReview: IReview = {
                type: REVIEW_TYPE.POSITIVE,
                title: "New review",
                text: "New review text",
                cinemaId: "3",
                dislikesAmount: 30,
                isDisliked: true,
                isLiked: true,
                likesAmount: 0,
                id: "J-2K1yWup3kSNAH8HRXmU",
                date: "2023-02-15T14:05:22.657Z",
            };

            const state: ReviewsState = {
                ...initialState,
                list: mockedReviewsList,
            };

            const action: PayloadAction<IReview> = { type: postReview.fulfilled.type, payload: newReview };

            expect(reducer(state, action)).toEqual({ ...state, list: [newReview, ...state.list] });
        });
    });

    describe("putReview action with extraReducers", () => {
        test("should change review state with 'putReview.fulfilled' action", () => {
            const state: ReviewsState = {
                ...initialState,
                list: [...mockedReviewsList],
            };

            const changedReview: IReview = {
                type: REVIEW_TYPE.POSITIVE,
                title: "Changed review title",
                text: "Changed review text",
                cinemaId: "1",
                dislikesAmount: 18,
                isDisliked: false,
                isLiked: true,
                likesAmount: 1,
                id: "2",
                date: "2023-02-15T14:05:22.657Z",
            };

            const action: PayloadAction<IReview> = { type: putReview.fulfilled.type, payload: changedReview };

            expect(reducer(state, action)).toEqual({ ...state, list: [mockedReviewsList[0], changedReview] });
        });
    });

    describe("deleteReview action with extraReducers", () => {
        test("should delete review with 'deleteReview.fulfilled' action", () => {
            const state: ReviewsState = {
                ...initialState,
                list: [...mockedReviewsList],
            };

            const action: PayloadAction<string> = { type: deleteReview.fulfilled.type, payload: "1" };

            expect(reducer(state, action)).toEqual({ ...state, list: [state.list[1]] });
        });
    });
});
