import * as Yup from "yup";
import { REVIEW_TYPE } from "../../../constants/reviewTypes";

export const reviewScheme = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    type: Yup.string().oneOf([REVIEW_TYPE.NEGATIVE, REVIEW_TYPE.NEUTRAL, REVIEW_TYPE.POSITIVE], "Review type is required"),
    text: Yup.string().required("Text is required"),
});
