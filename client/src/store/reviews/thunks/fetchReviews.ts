import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { IReview } from "../../../models/review";

type Params = {
    cinemaId: string;
    type?: string | null;
    page?: number;
    limit?: number;
};

type Response = {
    totalAmount: number;
    reviews: IReview[];
}

export const fetchReviews = createAsyncThunk<Response, Params>(
    "reviews/fetchReviews",
    async function ({ cinemaId, page = 1, limit = 3, type }) {
        const response = await api.get<IReview[]>("reviews", {
            params: {
                cinemaId,
                type,
                _limit: limit,
                _page: page,
                _sort: "date",
                _order: "desc"
            },
        });
        return {
            reviews: response.data,
            totalAmount: Number(response.headers["x-total-count"])
        };
    }
);