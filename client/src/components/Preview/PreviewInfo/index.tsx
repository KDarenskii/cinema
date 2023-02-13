import React from "react";
import { CINEMA_TYPE } from "../../../constants/cinemaType";
import cn from "classnames";

import "./styles.scss";

type Props = {
    year: string;
    age: number;
    type: CINEMA_TYPE;
    title: string;
    size?: "big";
    className?: string;
};

const PreviewInfo: React.FC<Props> = ({ year, age, type, title, size, className }) => {
    return (
        <div className={cn("preview-info", { "preview-info--absolut": size === "big" }, className)}>
            <span className={cn("preview-info__item", { "preview-info__item--big": size === "big" })}>{year}</span>
            <span className={cn("preview-info__item", { "preview-info__item--big": size === "big" })}>{type}</span>
            <span className={cn("preview-info__item", { "preview-info__item--big": size === "big" })}>{age + "+"}</span>
            <h5 className={cn("preview-info__title", { "preview-info__title--big": size === "big" })}>{title}</h5>
        </div>
    );
};

export default PreviewInfo;
