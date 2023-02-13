import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { IReview } from "../../../models/review";

type Params = {
    cinemaId: string;
    type?: string | null;
    page?: number;
    limit?: number;
};

export const addReviews = createAsyncThunk<IReview[], Params>(
    "reviews/addReviews",
    async function({ cinemaId, page = 1, limit = 3, type }) {
        const response = await api.get("reviews", {
            params: {
                _page: page,
                _limit: limit,
                type,
                cinemaId,
            }
        });
        return response.data;
    }
)