import { RootState } from "..";
import { REVIEW_TYPE } from "../../constants/reviewTypes";

export const selectReviews = (state: RootState) => {
    return {
        list: state.reviews.list,
        error: state.reviews.error,
        isLoading: state.reviews.isLoading,
        amounts: {
            positives: state.reviews.list.filter(review => review.type === REVIEW_TYPE.POSITIVE).length,
            negatives: state.reviews.list.filter(review => review.type === REVIEW_TYPE.NEGATIVE).length,
            neutrals: state.reviews.list.filter(review => review.type === REVIEW_TYPE.NEUTRAL).length,
            total: state.reviews.totalAmount
        }
    }
};