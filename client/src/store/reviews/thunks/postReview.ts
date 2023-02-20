import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IReview } from "../../../models/review";
import ReviewService from "../../../services/ReviewService";

type KnownError = {
    isAuthError?: boolean;
    message: string;
}

export const postReview = createAsyncThunk<IReview, IReview, { rejectValue: KnownError }>(
    "revews/postReview",
    async function(review, { rejectWithValue }) {
        try {
            const response = await ReviewService.postReview(review);
            return response.data;
        } catch (error) {
            const err = error as any;
            if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
                return rejectWithValue({ isAuthError: true, message: "Failed to create review" });
            }
            return rejectWithValue({ message: "Failed to create review" });
        }
    }
)