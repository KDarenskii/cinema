import React from "react";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.scss";

type Props = {
    isActive: boolean;
    className?: string;
};

const Bookmark: React.FC<Props> = ({ isActive, className }) => {
    const handleBookmarkClick = () => {};

    return (
        <div className={cn("bookmark", { "bookmark--active": isActive }, className)} onClick={handleBookmarkClick}>
            <FontAwesomeIcon icon={[`${isActive ? 'fas' : 'far'}`, "bookmark"]} className="bookmark__icon" />
        </div>
    );
};

export default Bookmark;
