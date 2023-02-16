import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { deleteReview } from "../../../../store/reviews/thunks/deleteReview";
import ActionButton from "../../../ActionButton";

import "./styles.scss";

type Props = {
    id: string;
};

const ReviewDeleteButton: React.FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(deleteReview(id));
    };

    return (
        <ActionButton className="review-delete-btn" onClick={handleClick} colorType="error">
            <FontAwesomeIcon icon={"trash-alt"} />
            Delete
        </ActionButton>
    );
};

export default ReviewDeleteButton;
