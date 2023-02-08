import React from "react";
import Card from "../Card";
import CardsWrapper from "../CardsWrapper";
import SectionTitle from "../SectionTitle";

import "./styles.scss";

const Recommendations: React.FC = () => {
    return (
        <section className="recommendations">
            <SectionTitle className="recommendations__title" text="Recommended for you" />
            <CardsWrapper>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </CardsWrapper>
        </section>
    );
};

export default Recommendations;
