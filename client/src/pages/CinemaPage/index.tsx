import React from "react";
import Cinema from "../../components/Cinema";
import Reviews from "../../components/Reviews";

import "./styles.scss";

const CinemaPage: React.FC = () => {
    return (
        <div className="cinema-page">
            <Cinema className="cinema-page__info" />
            <Reviews />
        </div>
    );
};

export default CinemaPage;
