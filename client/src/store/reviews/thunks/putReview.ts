import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { IReview } from "../../../models/review";

export const putReview = createAsyncThunk<IReview, IReview>(
    "reviews/putReview",
    async function(review) {
        const response = await api.put("reviews/" + review.id, review);
        return response.data;
    }
)