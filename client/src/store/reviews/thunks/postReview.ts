import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { IReview } from "../../../models/review";

export const postReview = createAsyncThunk<IReview, IReview>(
    "revews/postReview",
    async function(review) {
        const response = await api.post("reviews", review);
        return response.data;
    }
)