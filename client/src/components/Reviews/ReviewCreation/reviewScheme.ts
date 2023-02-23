import * as Yup from "yup";
import { REVIEW_TYPE } from "../../../constants/reviewTypes";

export const reviewScheme = Yup.object().shape({
    title: Yup.string().required("Title is required").min(2, "Min length: 2 characters").max(100, "Max length: 100 characters"),
    type: Yup.string().oneOf(
        [REVIEW_TYPE.NEGATIVE, REVIEW_TYPE.NEUTRAL, REVIEW_TYPE.POSITIVE],
        "Review type is required"
    ),
    text: Yup.string().required("Text is required").min(100, "Min length: 100 characters"),
});
