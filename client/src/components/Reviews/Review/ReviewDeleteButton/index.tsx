import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NOTION } from "../../../../constants/notion";
import { LOGIN_ROUTE } from "../../../../constants/routesPathnames";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useFromNavigate } from "../../../../hooks/useFromNavigate";
import { deleteReview } from "../../../../store/reviews/thunks/deleteReview";
import { showNotion } from "../../../../utils/showNotion";
import ActionButton from "../../../ActionButton";

import "./styles.scss";

type Props = {
    id: string;
};

const ReviewDeleteButton: React.FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();
    const navigateFrom = useFromNavigate();

    const handleClick = async () => {
        try {
            await dispatch(deleteReview(id)).unwrap();
            showNotion(NOTION.SUCCESS, "Review was deleted");
        } catch (error) {
            const err = error as any;
            if (err?.isAuthError) { 
                navigateFrom(LOGIN_ROUTE);
            } else {
                showNotion(NOTION.ERROR, err.message);
            }
        }
    };

    return (
        <ActionButton className="review-delete-btn" onClick={handleClick} colorType="error">
            <FontAwesomeIcon icon={"trash-alt"} />
            Delete
        </ActionButton>
    );
};

export default ReviewDeleteButton;
