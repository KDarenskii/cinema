import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ReviewService from "../../../services/ReviewService";

type KnownError = {
    isAuthError?: boolean;
    message: string;
};

export const deleteReview = createAsyncThunk<string, string, { rejectValue: KnownError }>(
    "reviews/deleteReview",
    async function (id, { rejectWithValue }) {
        try {
            await ReviewService.deleteReview(id);
            return id;
        } catch (error) {
            const err = error as any;
            if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
                return rejectWithValue({ isAuthError: true, message: "Failed to delete review" });
            }
            return rejectWithValue({ message: "Failed to delete review" });
        }
    }
);
