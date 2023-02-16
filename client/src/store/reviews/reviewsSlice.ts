import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview } from "../../models/review";
import { deleteReview } from "./thunks/deleteReview";
import { fetchReviews } from "./thunks/fetchReviews";
import { postReview } from "./thunks/postReview";
import { putReview } from "./thunks/putReview";

type SliceState = {
    isLoading: boolean;
    error: string | null;
    list: IReview[];
    totalAmount: number;
}

const initialState: SliceState = {
    isLoading: false,
    error: null,
    list: [],
    totalAmount: 0
}

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<IReview[]>) => {
            state.list = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.list = [...state.list, ...action.payload.reviews];
                state.totalAmount = action.payload.totalAmount;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(putReview.fulfilled, (state, action) => {
                state.list = state.list.map(review => {
                    if (review.id === action.payload.id) {
                        return action.payload;
                    }
                    return review;
                })
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.list = state.list.filter(review => review.id !== action.payload);
            })
            .addCase(postReview.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            })
    }
})

export const { setList } = reviewsSlice.actions;
export default reviewsSlice.reducer;