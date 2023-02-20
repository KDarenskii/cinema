import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFetchReviewsParams } from "../../../models/params/fetchReviewsParams";
import { IReview } from "../../../models/review";
import ReviewService from "../../../services/ReviewService";

type ReturnPayload = {
    totalCount: number;
    reviews: IReview[];
}

export const fetchReviews = createAsyncThunk<ReturnPayload, TFetchReviewsParams>(
    "reviews/fetchReviews",
    async function ({ cinemaId, type, page = 1, limit = 3 }) {
        const response = await ReviewService.fetchReviews({ cinemaId, type, page, limit });
        return {
            reviews: response.data,
            totalCount: Number(response.headers["x-total-count"])
        };
    }
);