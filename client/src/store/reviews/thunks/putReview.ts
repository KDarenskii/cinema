import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authApi } from "../../../api";
import { IReview } from "../../../models/review";

type KnownError = {
    isAuthError?: boolean;
    message: string;
};

export const putReview = createAsyncThunk<IReview, IReview, { rejectValue: KnownError }>(
    "reviews/putReview",
    async function (review, { rejectWithValue }) {
        try {
            const response = await authApi.put("reviews/" + review.id, review);
            return response.data;
        } catch (error) {
            const err = error as any;
            if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
                return rejectWithValue({ isAuthError: true, message: "Failed to react to the review" });
            }
            return rejectWithValue({ message: "Failed to react to the review" });
        }
    }
);
