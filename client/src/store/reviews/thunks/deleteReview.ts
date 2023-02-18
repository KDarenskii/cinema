import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authApi } from "../../../api";

type KnownError = {
    isAuthError?: boolean;
    message: string;
}

export const deleteReview = createAsyncThunk<string, string, { rejectValue: KnownError }>(
    "reviews/deleteReview", 
    async function(id, { rejectWithValue }) {
        try {
            await authApi.delete("reviews/" + id);
            return id;
        } catch (error) {
            const err = error as any;
            if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
                return rejectWithValue({ isAuthError: true, message: "Failed to delete review" });
            }
            return rejectWithValue({ message: "Failed to delete review" });
        }
    }
)