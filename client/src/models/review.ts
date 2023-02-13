import { REVIEW_TYPE } from "../constants/reviewTypes";

export interface IReview {
    id: string;
    cinemaId: string;
    title: string;
    text: string;
    type: REVIEW_TYPE;
}