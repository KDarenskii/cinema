import React from "react";
import cn from "classnames";

import "./styles.scss";

type Props = {
    src: string;
    className?: string;
}

const DescriptionPoster: React.FC<Props> = ({ src, className }) => {
    return (
        <div className={cn('description-poster', className)}>
            <img className="description-poster__img" src={src} alt="Poster" />
        </div>
    );
};

export default DescriptionPoster;
