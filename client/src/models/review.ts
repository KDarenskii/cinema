import { REVIEW_TYPE } from "../constants/reviewTypes";

export interface IReview {
    id: string;
    cinemaId: string;
    title: string;
    text: string;
    type: REVIEW_TYPE;
    isLiked: boolean;
    isDisliked: boolean;
    likesAmount: number;
    dislikesAmount: number;
    date: string;
}

export type IReviewPreview = Pick<IReview, "title" | "text" | "type">;