import React from "react";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { postBookmark } from "../../store/bookmarks/thunks/postBookmark";
import { deleteBookmark } from "../../store/bookmarks/thunks/deleteBookmark";
import { showNotion } from "../../utils/showNotion";
import { NOTION } from "../../constants/notion";
import { ITrailer } from "../../models/cinema";
import { useFromNavigate } from "../../hooks/useFromNavigate";
import { LOGIN_ROUTE } from "../../constants/routesPathnames";

import "./styles.scss";

type Props = {
    isActive: boolean;
    preview: ITrailer;
    className?: string;
};

const Bookmark: React.FC<Props> = ({ isActive, preview, className }) => {
    const dispatch = useAppDispatch();
    const navigateFrom = useFromNavigate();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleBookmarkClick = async (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (isSubmitting) return;
        setIsSubmitting(true);

        if (isActive) {
            try {
                await dispatch(deleteBookmark(preview.id)).unwrap();
                showNotion(NOTION.SUCCESS, "Bookmark deleted");
            } catch (error) {
                const err = error as any;
                if (err.isAuthError) {
                    navigateFrom(LOGIN_ROUTE);
                } else {
                    showNotion(NOTION.ERROR, err.message);
                }
            } finally {
                setIsSubmitting(false);
            }
        } else {
            try {
                await dispatch(postBookmark(preview)).unwrap();
                showNotion(NOTION.SUCCESS, "Bookmark added");
            } catch (error) {
                const err = error as any;
                if (err.isAuthError) {
                    navigateFrom(LOGIN_ROUTE);
                } else {
                    showNotion(NOTION.ERROR, err.message);
                }
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
