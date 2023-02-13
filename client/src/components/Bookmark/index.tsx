import React from "react";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { postBookmark } from "../../store/bookmarks/thunks/postBookmark";
import { deleteBookmark } from "../../store/bookmarks/thunks/deleteBookmark";
import { showNotion } from "../../utils/showNotion";
import { NOTION } from "../../constants/notion";
import { ITrailer } from "../../models/cinema";

import "./styles.scss";

type Props = {
    isActive: boolean;
    preview: ITrailer;
    className?: string;
};

const Bookmark: React.FC<Props> = ({ isActive, preview, className }) => {
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleBookmarkClick = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (isActive) {
            try {
                await dispatch(deleteBookmark(preview.id));
                showNotion(NOTION.SUCCESS, "Bookmark deleted");
            } catch (error) {
                showNotion(NOTION.ERROR, "Failed to delete bookmark");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            try {
                await dispatch(postBookmark(preview)).unwrap();
                showNotion(NOTION.SUCCESS, "Bookmarked successfully");
            } catch (error) {
                showNotion(NOTION.ERROR, "Failed to bookmark");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <button
            className={cn("bookmark", { "bookmark--active": isActive }, className)}
            onClick={handleBookmarkClick}
            disabled={isSubmitting}
        >
            <FontAwesomeIcon icon={[`${isActive ? "fas" : "far"}`, "bookmark"]} className="bookmark__icon" />
        </button>
    );
};

export default Bookmark;
