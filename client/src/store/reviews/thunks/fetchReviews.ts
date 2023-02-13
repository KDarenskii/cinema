import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { IReview } from "../../../models/review";

type Params = {
    cinemaId: string;
    type?: string | null;
    page?: number;
    limit?: number;
};

export const fetchReviews = createAsyncThunk<IReview[], Params>(
    "reviews/fetchReviews",
    async function ({ cinemaId, page = 1, limit = 3, type }) {
        const response = await api.get("reviews", {
            params: {
                cinemaId,
                type,
                _limit: limit,
                _page: page
            },
        });
        return response.data;
    }
);
