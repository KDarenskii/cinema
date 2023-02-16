import React from "react";
import { IReviewPreview } from "../../../models/review";
import cn from "classnames";

import "./styles.scss";

type Props = {
    preview: IReviewPreview;
    className?: string;
}

const PreviewReview: React.FC<Props> = ({ preview, className }) => {
    const [isFull, setIsFull] = React.useState(false);

    return (
        <article className={cn("review-preview", `review-preview--${preview.type}`, className)}>
            <h4 className="review-preview__title">{preview.title}</h4>
            <div className={cn("review-preview__content", { "review-preview__content--full": isFull })}>
                <p className="review-preview__text">{preview.text}</p>
            </div>
            <button className="review-preview__view-btn" onClick={() => setIsFull((prev) => !prev)}>
                {isFull ? "Show less" : "Show full review"}
            </button>
        </article>
    );
};

export default PreviewReview;
