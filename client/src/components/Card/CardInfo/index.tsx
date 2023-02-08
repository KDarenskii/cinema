import React from "react";
import { CINEMA_TYPE } from "../../../constants/cinemaType";
import cn from "classnames";

import "./styles.scss";

type Props = {
    year: number;
    age: string;
    type: CINEMA_TYPE;
    title: string;
    size?: "big";
    className?: string;
};

const CardInfo: React.FC<Props> = ({ year, age, type, title, size, className }) => {
    return (
        <div className={cn("card-info", { "card-info--absolut": size === "big" }, className)}>
            <span className={cn("card-info__item", { "card-info__item--big": size === "big" })}>{year}</span>
            <span className={cn("card-info__item", { "card-info__item--big": size === "big" })}>{type}</span>
            <span className={cn("card-info__item", { "card-info__item--big": size === "big" })}>{age}</span>
            <h5 className={cn("card-info__title", { "card-info__title--big": size === "big" })}>{title}</h5>
        </div>
    );
};

export default CardInfo;
