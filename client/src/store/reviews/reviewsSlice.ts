import { createSlice } from "@reduxjs/toolkit";
import { IReview } from "../../models/review";
import { addReviews } from "./thunks/addReviews";
import { fetchReviews } from "./thunks/fetchReviews";

type SliceState = {
    isLoading: boolean;
    error: string | null;
    list: IReview[];
}

const initialState: SliceState = {
    isLoading: false,
    error: null,
    list: []
}

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.list = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(addReviews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.list = [...state.list, ...action.payload];
            })
            .addCase(addReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? null;
            })
    }
})

export default reviewsSlice.reducer;