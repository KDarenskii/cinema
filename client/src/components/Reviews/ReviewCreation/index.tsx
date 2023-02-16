import React from "react";
import { REVIEW_TYPE, REVIEW_TYPE_VALUE } from "../../../constants/reviewTypes";
import ActionButton from "../../ActionButton";
import Input from "../../FormElements/Input";
import LightButton from "../../LightButton";
import Select from "../../FormElements/Select";
import Textarea from "../../FormElements/Textarea";
import { Formik } from "formik";
import cn from "classnames";
import { reviewScheme } from "./reviewScheme";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import FormErrorMessage from "../../FormElements/FormErrorMessage";
import PreviewReview from "../ReviewPreview";
import { IReview } from "../../../models/review";
import { nanoid } from "@reduxjs/toolkit";
import { postReview } from "../../../store/reviews/thunks/postReview";
import { showNotion } from "../../../utils/showNotion";
import { NOTION } from "../../../constants/notion";

import "./styles.scss";

type Props = {
    id: string;
    setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
};

interface Values {
    type: REVIEW_TYPE;
    title: string;
    text: string;
}

const ReviewCreation: React.FC<Props> = ({ id, className, setIsCreating }) => {
    const [isPreviewing, setIsPreviewing] = React.useState(false);

    const dispatch = useAppDispatch();

    const initialValues: Values = {
        type: REVIEW_TYPE.NONE,
        title: "",
        text: "",
    };

    const handleSubmit = async (values: Values) => {
        const newReview: IReview = {
            ...values,
            cinemaId: id,
            dislikesAmount: 0,
            isDisliked: false,
            isLiked: false,
            likesAmount: 0,
            id: nanoid(),
            date: new Date().toISOString(),
        };

        try {
            await dispatch(postReview(newReview));
            showNotion(NOTION.SUCCESS, "Review created");
        } catch (error) {
            showNotion(NOTION.ERROR, "Failed to create review");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={reviewScheme}>
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
                <div className={cn("review-creation", className)}>
                    {isPreviewing && <PreviewReview className="review-creation__preview" preview={values} />}
                    {!isPreviewing && (
                        <form className="review-creation__form" onSubmit={handleSubmit}>
                            <div className="review-creation__form-item">
                                <Select
                                    className="review-creation__form-select"
                                    disabled={isSubmitting}
                                    name="type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.type}
                                >
                                    <option className="review-creation__form-option" value={REVIEW_TYPE.NONE}>
                                        Choose review type...
                                    </option>
                                    <option className="review-creation__form-option" value={REVIEW_TYPE.POSITIVE}>
                                        {REVIEW_TYPE_VALUE.positive}
                                    </option>
                                    <option className="review-creation__form-option" value={REVIEW_TYPE.NEGATIVE}>
                                        {REVIEW_TYPE_VALUE.negative}
                                    </option>
                                    <option className="review-creation__form-option" value={REVIEW_TYPE.NEUTRAL}>
                                        {REVIEW_TYPE_VALUE.neutral}
                                    </option>
                                </Select>
                                {errors.type && touched.type && (
                                    <FormErrorMessage className="review-creation__form-error" message={errors.type} />
                                )}
                            </div>
                            <div className="review-creation__form-item">
                                <Input
                                    className="review-creation__form-input"
                                    disabled={isSubmitting}
                                    placeholder="Title"
                                    type="text"
                                    name="title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.title}
                                />
                                {errors.title && touched.title && (
                                    <FormErrorMessage className="review-creation__form-error" message={errors.title} />
                                )}
                            </div>
                            <div className="review-creation__form-item">
                                <Textarea
                                    className="review-creation__form-textarea"
                                    name="text"
                                    placeholder="Text"
                                    disabled={isSubmitting}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.text}
                                />
                                {errors.text && touched.text && (
                                    <FormErrorMessage className="review-creation__form-error" message={errors.text} />
                                )}
                            </div>
                            <ActionButton
                                className="review-creation__form-submit-btn"
                                disabled={isSubmitting}
                                type="submit"
                                colorType="success"
                            >
                                Publish review
                            </ActionButton>
                        </form>
                    )}
                    <LightButton
                        className="review-creation__preview-btn"
                        onClick={() => setIsPreviewing((prev) => !prev)}
                        type="button"
                        disabled={
                            isSubmitting || Boolean(!values.text || !values.title || values.type === REVIEW_TYPE.NONE)
                        }
                    >
                        {isPreviewing ? "Back to editing" : "Preview"}
                    </LightButton>
                </div>
            )}
        </Formik>
    );
};

export default ReviewCreation;
