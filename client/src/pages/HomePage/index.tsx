import React from "react";
import Recommendations from "../../components/Recommendations";
import Search from "../../components/Search";
import Trending from "../../components/Trending";

import "./styles.scss";

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <Search className="home-page__search" />
            <Trending className="home-page__trending" />
            <Recommendations />
        </div>
    );
};

export default HomePage;
