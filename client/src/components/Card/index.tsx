import React from "react";
import { Link } from "react-router-dom";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import { ICinema } from "../../models/cinema";
import Bookmark from "../Bookmark";
import CardInfo from "./CardInfo";

import "./styles.scss";

type Props = {
    size?: "big";
};

const Card: React.FC<Props> = ({ size }) => {
    const isActive = false;
    return (
        <Link className="card" to="">
            <article className="card__body">
                <div className="card__photo-box">
                    <img
                        className="card__img"
                        src="https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/9c918339-f643-4663-a716-4655c121a674/1920x"
                        alt="Preview"
                    />
                    <Bookmark className="card__bookmark" isActive={isActive} />
                </div>
                <CardInfo
                    className="card__info"
                    year={2017}
                    type={CINEMA_TYPE.MOVIE}
                    age={"PG"}
                    title="Forrest Gump"
                    size={size}
                />
            </article>
        </Link>
    );
};

export default Card;
