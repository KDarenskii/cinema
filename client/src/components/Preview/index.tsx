import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ITrailer } from "../../models/cinema";
import { selectBookmarkById } from "../../store/bookmarks/selectors";
import Bookmark from "../Bookmark";
import PreviewInfo from "./PreviewInfo";
import cn from "classnames";

import "./styles.scss";

type Props = {
    preview: ITrailer;
    className?: string;
    size?: "big";
};

const Preview: React.FC<Props> = ({ preview, size, className }) => {
    const { imageSrc, age, id, title, type, year } = preview;

    const isBookmarked = useAppSelector((state) => selectBookmarkById(state, id));

    return (
        <article className={cn("preview", className)}>
            <Link className="preview__body" to={"/cinema/" + id}>
                <div className="preview__photo-box">
                    <img className="preview__img" src={imageSrc} alt="Preview" />
                    <Bookmark className="preview__bookmark" isActive={Boolean(isBookmarked)} preview={preview} />
                </div>
                <PreviewInfo className="preview__info" year={year} type={type} age={age} title={title} size={size} />
            </Link>
        </article>
    );
};

export default Preview;
