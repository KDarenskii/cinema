import { AxiosRequestConfig, AxiosResponse } from "axios";
import { api, authApi } from "../api";
import { REVIEW_ENDPOINT } from "../constants/endPoints";
import { TFetchReviewsParams } from "../models/params/fetchReviewsParams";
import { IReview } from "../models/review";

export default class ReviewService {
    static fetchReviews = async (
        { cinemaId, type, page = 1, limit = 3 }: TFetchReviewsParams,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<IReview[]>> => {
        const requestParams = {
            cinemaId,
            type,
            _limit: limit,
            _page: page,
            _sort: "date",
            _order: "desc",
        };
        return api.get<IReview[]>(REVIEW_ENDPOINT, { params: requestParams, ...config });
    };

    static postReview = async (review: IReview, config?: AxiosRequestConfig): Promise<AxiosResponse<IReview>> => {
        return authApi.post<IReview>(REVIEW_ENDPOINT, review, config);
    };

    static putReview = async (review: IReview, config?: AxiosRequestConfig): Promise<AxiosResponse<IReview>> => {
        return authApi.put<IReview>(`${REVIEW_ENDPOINT}/${review.id}`, review, config);
    };

    static deleteReview = async (id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<void>> => {
        return authApi.delete<void>(`${REVIEW_ENDPOINT}/${id}`, config);
    };
}
